import org.scalatestplus.play._
import models._

class TaskListInMemoryModelSpec extends PlaySpec {
    "TaskListInMemoryModel" must {
        "do valid login for default user" in {
            TaskListInMemoryModel.validateUser("Mark", "pass") mustBe (true)
        }
        "reject login with wrong password" in {
            TaskListInMemoryModel.validateUser("Mark", "password") mustBe (false)
        }
        "reject login with wrong username" in {
            TaskListInMemoryModel.validateUser("Mike", "pass") mustBe (false)
        }

        "get correct default tasks" in {
            TaskListInMemoryModel.getTasks("Mark") mustBe (List("Make Videos", "eat", "sleep", "code"))
        }
    }
}