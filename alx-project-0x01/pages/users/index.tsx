import React, { useState } from "react";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import { UserProps, UserData } from "@/interfaces";

interface UsersPageProps {
  posts: UserProps[];
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}

const Users: React.FC<UsersPageProps> = ({ posts }) => {
  const [users, setUsers] = useState<UserProps[]>(posts);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = (data: UserData) => {
    setUsers((prev) => [...prev, data]);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add User
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default Users;
