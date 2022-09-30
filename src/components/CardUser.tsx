import { useRouter } from "next/router";
import { IUser } from "../interfaces/IUser";

interface CardUserProps {
  user: IUser;
}

export function CardUser({ user }: CardUserProps) {
  const router = useRouter();

  const handleUserDetails = () => {
    router.push(`/users/details/${user.login}`);
  }

  return (
    <div className="bg-white rounded-sm shadow p-4 flex flex-row items-center cursor-pointer hover:brightness-95 transition-all duration-150" onClick={handleUserDetails}>
      <div className="gap-5 flex items-center">
        <small>{user.id}</small>
        <img src={user.avatar_url} alt="Avatar" className="w-14 rounded-full" />
      </div>
      <div className="flex">
        <h3 className="ml-5 font-bold">{user.login}</h3>
      </div>
    </div>
  );
}
