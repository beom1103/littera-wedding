"use client";
import { useAuth } from "@context/auth.context";
import { AuthProvider } from "@rest/auth/auth.dto";
import Image from "next/image";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog = ({ isOpen, onClose }: LoginDialogProps) => {
  const { login } = useAuth();
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-extrabold">Littera</h1>
        <div className="border-2 p-3">
          <h2 className="mb-4 text-2xl font-bold">로그인</h2>
          <button
            onClick={() => login(AuthProvider.Naver)}
            className="m-4 flex h-[56px] w-[360px] items-center justify-center rounded-[6px] bg-[#03c75a] font-bold text-white"
          >
            <img src="/naver.svg" alt="Naver Logo" width={40} />
            네이버 로그인
          </button>
          <button
            onClick={() => login(AuthProvider.Kakao)}
            className="m-4 flex h-[56px] w-[360px] items-center justify-center rounded-[6px] bg-[#FEE500] font-bold"
          >
            <img src="/kakao.svg" alt="Kakao Logo" width={40} />
            카카오 로그인
          </button>
          <button className="btn btn-ghost" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
