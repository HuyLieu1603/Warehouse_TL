import React from "react";
import { useState } from "react";
import { register } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }
    try {
      await register({
        email: form.email,
        password: form.password,
      });
      alert("Đăng ký thành công!");
      navigate("/sign-in");
    } catch (error) {
      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Tạo tài khoản</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Nhập email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              placeholder="Tạo mật khẩu"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nhập lại mật khẩu</label>
            <input
              type="password"
              className="form-control"
              placeholder="Xác nhận mật khẩu"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
