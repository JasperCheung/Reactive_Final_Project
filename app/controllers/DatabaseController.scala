package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.mvc._

import play.api.db.Database
import play.db.NamedDatabase
import scala.concurrent.Future

import scala.concurrent.ExecutionContext
import java.time.LocalDateTime
import akka.http.javadsl.model.DateTime




@Singleton
class DatabaseController @Inject()(@NamedDatabase("db") diaryDatabase: Database, cc: ControllerComponents) (implicit ec: ExecutionContext) extends AbstractController(cc) {

  def databaseGet = Action {request =>
    // val dbResult = {
    //     Future {
    //         diaryDatabase.withConnection{ conn =>
    //             val statement = conn.createStatement()
    //             val resultSet = statement.executeQuery("SELECT * FROM Users")
                
    //         }
    //     } 
    // }
    val connection = diaryDatabase.getConnection()
    val statement = connection.createStatement()
    val resultSet = statement.executeQuery("SELECT * FROM Users")
    var userName: String = ""

    if(resultSet.next()){
        userName = resultSet.getString("Username")
    }
    
    //println(request)
    println(userName)
    Ok(Json.obj("content" -> userName ))
  }
  
  def register = Action {request =>

    val postVals = request.body.asFormUrlEncoded
    var uid = -1
    postVals.map{ args =>

      val username = args("username").head
      val password = args("password").head

      diaryDatabase.withConnection{ conn =>
        val statement = conn.createStatement()
        try{
          val registered = statement.executeUpdate(s"INSERT INTO Users (Username, Hash_password) VALUES ('$username', '$password')")
        if(registered != 0){

          val resultSet = statement.executeQuery(s"SELECT id FROM Users WHERE Username = '$username'")
          if(resultSet.next()){
            uid = resultSet.getInt("id")
  
          }
          
        }
        println(registered)
        }
        catch{
          case _: Throwable =>
        }
      }
      
      println(username)
      println(password)
      Ok(Json.obj("success" -> true, "uid" -> uid))
    }.getOrElse(Ok(Json.obj("success" -> false, "uid" -> -1)))

  }

  def login = Action { request =>

    val postVals = request.body.asFormUrlEncoded
    var uid = -1

    postVals.map { args =>
      val username = args("username").head
      val password = args("password").head

      diaryDatabase.withConnection{ conn =>
        val statement = conn.createStatement()
        try {
          val resultSet = statement.executeQuery(s"SELECT id FROM Users WHERE Username = '$username' AND Hash_password = '$password'")
          if(resultSet.next()){
            uid = resultSet.getInt("id")

          }
        }
        catch{
          case _: Throwable =>
        }
      }
      
      
      Ok(Json.obj("success" -> true, "uid" -> uid))
    }.getOrElse(Ok(Json.obj("success" -> false, "uid" -> -1)))

  }

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

    postVals.map { args =>
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

}