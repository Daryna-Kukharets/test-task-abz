import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { UsersList } from "../../components/UsersList/UsersList";
import { fetchUsersFirstPage, User, UsersResponse } from "../../api/users";
import { Loader } from "../../components/Loader/Loader";

type Props = {
  onResetToFirstPage: (resetFn: () => void) => void;
};

export const UsersSection: React.FC<Props> = ({ onResetToFirstPage }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const count = 6;

  const loadUsers = async () => {
    if (page > totalPages) {
      return;
    }

    setLoading(true);

    try {
      const data: UsersResponse = await fetchUsersFirstPage(page, count);

      if (data.success) {
        setUsers((prev) => [...prev, ...data.users]);
        setTotalPages(data.total_pages);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetToFirstPage = async () => {
    setUsers([]);
    setPage(1);
    setTotalPages(1);
    setInitialLoading(true);

    try {
      const data: UsersResponse = await fetchUsersFirstPage(1, count);
      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.total_pages);
        setPage(2);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setInitialLoading(false);
    }
  };

   useEffect(() => {
    resetToFirstPage();
    onResetToFirstPage?.(resetToFirstPage);
  }, []);

  return (
    <section id="users" className="usersSection">
      <div className="usersSection__box">
        <h1 className="usersSection__title">Working with GET request</h1>
        {initialLoading ? (
          <Loader /> 
        ) : (
          <>
            <UsersList users={users} />
            
            {loading && <Loader />} 
            
            {page <= totalPages && (
              <div className="usersSection__button">
                <Button name="Show more" width="120px" onClick={loadUsers} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};