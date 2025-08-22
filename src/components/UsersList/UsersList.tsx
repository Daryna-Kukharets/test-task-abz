import { User } from "../../api/users";
import { UserCard } from "../UserCard/UserCard";

type Props = {
  users: User[];
};

export const UsersList: React.FC<Props> = ({ users }) => {
  return (
    <div className="usersList">
      <div className="usersList__box">
        {users.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
};
