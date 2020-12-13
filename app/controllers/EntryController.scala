package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.mvc._

import play.api.db.Database
import play.db.NamedDatabase
import scala.concurrent.Future

import scala.concurrent.ExecutionContext
import java.time.LocalDate
import java.time.LocalDateTime
import akka.http.javadsl.model.DateTime




@Singleton
class EntryController @Inject()(@NamedDatabase("db") db: Database, cc: ControllerComponents) (implicit ec: ExecutionContext) extends AbstractController(cc) {

  def createEntry = Action { request =>
    val postVals = request.body.asFormUrlEncoded
    var success = false

    postVals.map { args =>
      ///need to replace args("uid") with cookies
      val uid = args("uid").head
      val title = args("title").head
      val content = args("content").head
      val dateTime = DateTime.now()



      db.withConnection{ conn =>
        val statement = conn.createStatement()
        try {
          val diaryCreated= statement.executeUpdate(s"INSERT INTO Entries (User_id, Title, Content, Time_created) VALUES ('$uid', '$title', '$content', '$dateTime')")
          if(diaryCreated != 0)
          {
            success = true
          }

        }
        catch {
          case _: Throwable =>
        }
      }

      Ok(Json.obj("success" -> success))

    }.getOrElse(Ok(Json.obj("success" -> success)))


  }

  def updateEntry = Action {request =>
    var success = false

    val postVals = request.body.asFormUrlEncoded
    println(postVals)

    postVals.map { args =>
      println("post",args)
      val id = args("id").head
      val content = args("content").head
      val dateTime = DateTime.now()

      db.withConnection{ conn =>
      val statement = conn.createStatement()

      try {
        val diaryUpdated = statement.executeUpdate(s"UPDATE Entries SET Content = '$content', Time_created = '$dateTime' WHERE  id = '$id'")

        if(diaryUpdated != 0){

          success = true
        }

      }
      catch{
        case _: Throwable =>
      }


    }

    Ok(Json.obj("success" -> success))
    }.getOrElse( Ok(Json.obj("success" -> success)))

  }

  def getEntry(id: Int) = Action {request =>
    var success = false
    val connection = db.getConnection()
    val statement = connection.createStatement()
    val resultSet = statement.executeQuery(s"SELECT * FROM Entries WHERE  id = '$id'")
    var content: String = ""
    var title: String = ""
    var timeCreated: String = ""
    var uid = -1


    try{
      db.withConnection{ conn =>

        val statement = conn.createStatement()
        val resultSet = statement.executeQuery(s"SELECT * FROM Entries WHERE id = '$id' ")
        if(resultSet.next()){
          content = resultSet.getString("Content")
          title = resultSet.getString("Title")
          timeCreated = resultSet.getString("Time_created")
          uid = resultSet.getInt("User_id")
          success = true
        }
      }
    }
    catch {
      case _ : Throwable =>
    }

    Ok(Json.obj("entry_id" -> id,
                "title" -> title,
                "timeCreated" -> timeCreated,
                "content" -> content,
                "uid" -> uid,
                "success" -> success
       ))

  }

  def getAllEntries() = Action { request =>
    //val uid = request.cookies.get("uid")
    val uid = 9
    var completeSet = Json.obj()
    db.withConnection{ conn =>
      val statement = conn.createStatement()
      val resultSet = statement.executeQuery(s"SELECT * FROM Entries WHERE User_id = '$uid' ")
      var i : Int = 1
      while(resultSet.next()){
        var result = Json.obj("id" -> resultSet.getInt("id"), 
                              "title" -> resultSet.getString("Title"), 
                              "content" -> resultSet.getString("Content"), 
                              "timeCreated" -> resultSet.getString("Time_created")
                              )
        println(result.toString()) 
        completeSet += (s"$i" -> result)
        i += 1
      }

    }

    Ok(completeSet)

  }

}
