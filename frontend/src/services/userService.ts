import jwt from "jsonwebtoken";

function roleWeight(role: string): number {
  switch (role) {
    case "admin":
      return 1;
    case "moderator":
      return 2;
    case "member":
      return 3;
    default:
      return 3;
  }
}

export function userCanEdit(compareRole: string, compareUserId: number) {
  const token = localStorage.getItem("token");
  if (!token) return false;
  let canEdit: boolean = false;
  jwt.verify(
    token,
    process.env.REACT_APP_JWT_SECRETKEY as string,
    function (err, userData) {
      if (!userData || err) return false;
      if (userData) {
        const myId: number = userData.userId;
        const myRole: string = userData.userRole;
        if (roleWeight(compareRole) > roleWeight(myRole)) {
          canEdit = true;
        } else if (roleWeight(compareRole) === roleWeight(myRole)) {
          canEdit = compareUserId === myId;
        } else {
          canEdit = false;
        }
      }
    }
  );
  return canEdit;
}
