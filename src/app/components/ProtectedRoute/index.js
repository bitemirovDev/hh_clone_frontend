import { jwt_decode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const router = useRouter();

  if (token) {
    let decodedToken = jwt_decode(token);

    if (decodedToken.exp * 1000 > Date.now()) {
      return <>{children}</>;
    } else if (decodedToken.role.name === "employee") {
      router.push("/login");
    } else if (decodedToken.role.name === "manager") {
      router.push("/employer/signUp");
    }
  } else {
    router.push("/login");
  }
}
