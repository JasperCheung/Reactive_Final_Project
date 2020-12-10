package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.mvc._

import play.api.db.Database
import play.db.NamedDatabase
import scala.concurrent.Future

import scala.concurrent.ExecutionContext


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
}