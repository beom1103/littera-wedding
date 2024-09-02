"use client";

import { useState } from "react";
import Link from "next/link";
import LoginDialog from "../ui/LoginDialog";
import { useAuth } from "@context/auth.context";

const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleOpenLoginDialog = () => {
    setIsLoginDialogOpen(true);
  };

  const handleCloseLoginDialog = () => {
    setIsLoginDialogOpen(false);
  };

  return (
    <header className="navbar fixed z-20 border-b border-x-gray-500 bg-inherit">
      <div className="navbar-start">
        <div className="dropdown"></div>
        <Link href="/" className="btn btn-ghost btn-sm bg-primary text-xl text-white">
          Littera
        </Link>
      </div>
      <div className="navbar-center hidden font-bold lg:flex">
        <Link href="/invitations" className="mx-3 text-xl">
          모바일 청첩장
        </Link>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end mr-3">
            <label tabIndex={0} className="avatar placeholder cursor-pointer">
              <div className="w-10 rounded-full bg-primary font-bold text-white">
                <span>{user.name.slice(0, 1)}</span>
              </div>
            </label>
            <ul tabIndex={0} className="menu-compact menu dropdown-content mt-3 w-52 rounded-box bg-white p-2 shadow">
              <li>
                <Link href="/my" className="justify-between">
                  마이페이지
                </Link>
              </li>
              <li>
                <a onClick={logout}>로그아웃</a>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn btn-ghost btn-sm mr-2 bg-primary text-white" onClick={handleOpenLoginDialog}>
            로그인
          </button>
        )}
      </div>
      <LoginDialog isOpen={isLoginDialogOpen} onClose={handleCloseLoginDialog} />
    </header>
  );
};

export default Header;
