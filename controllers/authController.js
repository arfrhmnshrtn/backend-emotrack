const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

// Penyimpanan OTP sementara
const pendingUsers = {};
const resetTokens = {};

// Register - Kirim OTP
exports.register = (req, res) => {
  const { username, name, date, email, password, role, hpht } = req.body;

  if (!email) return res.status(400).json({ message: "Email wajib diisi" });

  // Cek apakah email sudah terdaftar
  User.findUserByEmail(email, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Validasi password
    if (password.length < 8)
      return res.status(400).json({ message: "Password minimal 8 karakter" });

    // Validasi role
    if (!["ibu_hamil", "keluarga"].includes(role))
      return res.status(400).json({ message: "Role tidak valid" });

    // Validasi HPHT
    if (role === "ibu_hamil" && !hpht)
      return res.status(400).json({ message: "HPHT wajib diisi" });

    // Generate OTP dan kadaluarsa
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit angka
    const expires = Date.now() + 5 * 60 * 1000;

    // Enkripsi password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res.status(500).json({ message: "Gagal mengenkripsi password" });

      // Simpan data sementara
      pendingUsers[email] = {
        userData: {
          username,
          name,
          date,
          email,
          password: hashedPassword,
          role,
          hpht: role === "ibu_hamil" ? hpht : null,
        },
        code: otpCode,
        expires,
      };

      // Kirim email OTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"EMOTRACK SUPPORT" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Kode Verifikasi Pendaftaran - Emotrack",
        html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center" style="padding-bottom: 20px;">
                <img src="https://example.com/logo.png" alt="Emotrack Logo" width="120" style="max-width: 120px; height: auto;"/>
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 15px;">
                <h2 style="color: #2c3e50; font-size: 22px; font-weight: 600; margin: 0; text-align: center;">Verifikasi Akun Emotrack</h2>
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 25px;">
                <p style="color: #555555; font-size: 15px; line-height: 1.5; margin: 0; text-align: center;">Terima kasih telah mendaftar. Gunakan kode OTP berikut untuk menyelesaikan verifikasi akun Anda:</p>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-bottom: 25px;">
                <div style="background: #f8f9fa; padding: 15px 30px; border-radius: 6px; display: inline-block; border: 1px dashed #e0e0e0;">
                    <h1 style="color: #3498db; font-size: 28px; letter-spacing: 3px; margin: 0; font-weight: 700;">${otpCode}</h1>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding-bottom: 30px;">
                <p style="color: #777777; font-size: 14px; line-height: 1.5; margin: 0; text-align: center;">
                    Kode verifikasi ini akan kedaluwarsa dalam <strong>5 menit</strong>.<br>
                    Jangan berikan kode ini kepada siapa pun, termasuk pihak Emotrack.
                </p>
            </td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #eeeeee; padding-top: 20px;">
                <p style="color: #999999; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                    Jika Anda tidak meminta kode ini, silakan abaikan email ini atau hubungi tim dukungan kami di<br>
                    <a href="mailto:support@emotrack.com" style="color: #3498db; text-decoration: none;">support@emotrack.com</a>
                </p>
            </td>
        </tr>
    </table>
</div>
        `,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Gagal mengirim email verifikasi" });
        }

        res.json({
          message: "Kode verifikasi telah dikirim ke email Anda",
        });
      });
    });
  });
};

// Verifikasi OTP dan Simpan User ke DB
exports.verifyRegisterOTP = (req, res) => {
  const { email, code } = req.body;
  const pending = pendingUsers[email];

  if (!pending || pending.code !== code || Date.now() > pending.expires) {
    return res.status(400).json({ message: "Kode OTP salah atau kadaluarsa" });
  }

  User.createUser(pending.userData, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Gagal mendaftar", error: err });
    }

    delete pendingUsers[email];
    res.json({ message: "Registrasi berhasil dan akun terverifikasi" });
  });
};

// Kirim ulang OTP register
exports.resendRegisterOTP = (req, res) => {
  const { email } = req.body;

  const pending = pendingUsers[email];
  if (!pending) {
    return res.status(400).json({
      message: "Data pendaftaran tidak ditemukan atau sudah kedaluwarsa",
    });
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit angka
  const expires = Date.now() + 5 * 60 * 1000; // berlaku 5 menit

  pendingUsers[email].code = otpCode;
  pendingUsers[email].expires = expires;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Emotrack Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Kode Verifikasi Baru - Emotrack",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color:#4CAF50">Verifikasi Ulang Akun Emotrack</h2>
        <p>Kode OTP baru Anda adalah:</p>
        <h1 style="background:#f2f2f2; padding:10px; border-radius:5px; display:inline-block;">${otpCode}</h1>
        <p>Kode ini berlaku selama 5 menit. Jangan bagikan kepada siapa pun.</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Gagal mengirim ulang OTP" });
    }

    res.json({ message: "Kode OTP baru telah dikirim ke email Anda" });
  });
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error saat membandingkan password" });
      if (!isMatch) return res.status(401).json({ message: "Password salah" });

      const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", {
        expiresIn: "1h",
      });

      res.json({
        message: "Login berhasil",
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          hpht: user.hpht,
          email: user.email,
          role: user.role,
        },
      });
    });
  });
};

// Lupa Password - Kirim OTP
exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000;

    resetTokens[email] = { code: resetCode, expires };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Emotrack Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Kode Reset Password - Emotrack",
      html: `
        <div style="font-family: Arial, padding: 20px;">
          <h2 style="color: #4CAF50;">Reset Password Emotrack</h2>
          <p>Gunakan kode berikut untuk reset password akun Anda:</p>
          <h1 style="background: #f2f2f2; padding: 15px; text-align: center; border-radius: 5px;">${resetCode}</h1>
          <p>Kode ini hanya berlaku selama 5 menit.</p>
          <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Gagal mengirim email" });
      }

      res.json({ message: "Kode verifikasi dikirim ke email Anda" });
    });
  });
};

// Verifikasi OTP Reset
exports.verifyResetCode = (req, res) => {
  const { email, code } = req.body;
  const token = resetTokens[email];

  if (!token || token.code !== code || Date.now() > token.expires) {
    return res.status(400).json({ message: "Kode salah atau kadaluarsa" });
  }

  res.json({ message: "Kode valid" });
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const token = resetTokens[email];

  if (!token || token.code !== code || Date.now() > token.expires) {
    return res.status(400).json({ message: "Kode salah atau kadaluarsa" });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: "Password minimal 8 karakter" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updatePasswordByEmail(email, hashedPassword); // Pastikan ini versi promise atau ubah ke promisify

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Emotrack Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Berhasil Direset - Emotrack",
      html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 40px;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <img src="https://i.ibb.co/fnYKrGH/emotrack-logo.png" alt="Emotrack" style="width: 120px;" />
                </div>

                <h2 style="color: #333333; text-align: center;">Password Anda Berhasil Direset</h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                  Halo,<br><br>
                  Kami ingin memberi tahu bahwa password akun Anda telah berhasil diubah. Jika Anda tidak melakukan perubahan ini, segera hubungi tim dukungan kami untuk tindakan lebih lanjut.
                </p>

                <p style="color: #888888; font-size: 14px; text-align: center;">
                  Email ini dikirim secara otomatis, mohon untuk tidak membalas.
                </p>
              </div>
            </div>
          `,
    };

    await transporter.sendMail(mailOptions);

    delete resetTokens[email];

    res.json({ message: "Password berhasil direset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan internal" });
  }
};
