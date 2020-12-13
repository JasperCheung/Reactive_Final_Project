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
class AuthController @Inject()(@NamedDatabase("db") diaryDatabase: Database, cc: ControllerComponents) (implicit ec: ExecutionContext) extends AbstractController(cc) {

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
    var success= false
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
            success=true
            uid = resultSet.getInt("id")

          }
        }
        catch{
          case _: Throwable =>
        }
      }
      var warning = ""
      if(!success){
         warning = "invalid login!"
      }
      Ok(Json.obj("success" -> success, "uid" -> uid,"warning" -> warning))
    }.getOrElse(Ok(Json.obj("success" -> success, "uid" -> -1, "warning"->"invalid login!")))

  }

}
