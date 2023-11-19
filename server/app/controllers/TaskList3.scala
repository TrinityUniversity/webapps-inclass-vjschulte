package controllers

import javax.inject._

import play.api.mvc._
import play.api.i18n._
import models.TaskListInMemoryModel
import play.api.libs.json.Json
import models._
import play.api.libs.json.JsSuccess
import play.api.libs.json.JsError

@Singleton
class TaskList3 @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
    def load = Action { implicit request => 
        Ok(views.html.version3Main())
    }

    implicit val userDataReads = Json.reads[UserData]

    def validate = Action { implicit request =>
        request.body.asJson.map { body => 
            Json.fromJson[UserData](body) match {
                case JsSuccess(ud, path) =>
                    if(TaskListInMemoryModel.validateUser(ud.username, ud.password)) {
                        Ok(Json.toJson(true))
                        .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.get.value)
                    } else {
                        Ok(Json.toJson(false))
                    }
                case e @ JsError (_) => Redirect(routes.TaskList3.load)
            }
        }.getOrElse(Redirect(routes.TaskList3.load))
    }

    def taskList = Action { implicit request =>
        val usernameOption = request.session.get("username")
        usernameOption.map { username =>
            Ok(Json.toJson(TaskListInMemoryModel.getTasks(username)))
        }.getOrElse(Ok(Json.toJson(Seq.empty[String])))
    }
}