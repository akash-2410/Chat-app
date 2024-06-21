import {BiLogOut} from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
  const {logout, loading} = useLogout();

  return(
  <div className="mt-auto">
    {!loading ? (
    <BiLogOut className="w-6 h-4 text-white cursor-pointer" onClick={logout} />
    ) : (
      <span className="loading loading-spinner"></span>
    )}
</div>
  );
};
export default LogoutButton;
