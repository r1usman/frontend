import { useContext } from "react";
import ShowCourses from "../liveclass/pages/ShowCourses";
import { UserContext } from "../GlobalContext/UserContext";
import S_ShowCourses from "../liveclass/pages/S_ShowCourses";

const AdminDashboard = () => {
  const { User } = useContext(UserContext);
  // console.log(User);
  return User?.status === "Instructor" ? <ShowCourses /> : <S_ShowCourses />;
};

export default AdminDashboard;
