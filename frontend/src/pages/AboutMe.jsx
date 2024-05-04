import { useSelector } from "react-redux";
import { getUser } from "../reducer/userSlice";
import AppLayout from "../components/AppLayout";

function AboutMe() {
  const user = useSelector(getUser);
  return (
    <AppLayout>
      <h1>Hello {user.username}</h1>
    </AppLayout>
  );
}

export default AboutMe;
