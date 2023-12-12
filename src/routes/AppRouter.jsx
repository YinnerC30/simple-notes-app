import { Navigate, Route, Routes } from "react-router-dom";
import { PrincipalPage } from "../pages/PrincipalPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<PrincipalPage />} />
      </Routes>
    </>
  );
};
