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
class EntryController @Inject()(@NamedDatabase("db") diaryDatabase: Database, cc: ControllerComponents) (implicit ec: ExecutionContext) extends AbstractController(cc) {

  def createEntry = Action { request =>
    val postVals = request.body.asFormUrlEncoded
    var success = false

    postVals.map { args =>
      ///need to replace args("uid") with cookies
      val uid = args("uid").head
      val title = args("title").head
      val content = args("content").head
      val dateTime = DateTime.now()



      diaryDatabase.withConnection{ conn =>
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

      diaryDatabase.withConnection{ conn =>
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
    val connection = diaryDatabase.getConnection()
    val statement = connection.createStatement()
    val resultSet = statement.executeQuery(s"SELECT * FROM Entries WHERE  id = '$id'")
    var content: String = ""
    var title: String = ""
    var timeCreated: String = ""
    var uid = -1

    if(resultSet.next()){
      content = resultSet.getString("Content")
      title = resultSet.getString("Title")
      timeCreated = resultSet.getString("Time_created")
      uid = resultSet.getInt("User_id")
      success = true
    }

    //println(request)
    //println("yrrewornweoirnewoirnweoirnewoinr")
    //println(resultSet)
    Ok(Json.obj("entry_id" -> id,
                "title" -> title,
                "timeCreated" -> timeCreated,
                "content" -> content,
                "uid" -> uid,
                "success" -> success
       ))

  }

}
