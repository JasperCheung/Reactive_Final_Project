package controllers

import javax.inject._

import play.api.libs.json.Json
import play.api.mvc._

@Singleton
class CookieController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def cookieGet = Action {request =>
    val cookie = request.cookies.get("test") match {
      case Some(cookie) =>
        cookie.value

      case None =>
        ""

    }
    println(request)
    println(cookie)
    Ok(Json.obj("content" -> cookie ))
  }
}
