import { useState } from "react";
import "./App.css";

function Form() {
  const [nama, setNama] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [jurusan, setjurusan] = useState("");
  const [muncul, setmuncul]= useState(true);


  function nameChange(e) {
    setNama(e.target.value);
  }
  function emailChange(e) {
   setemail(e.target.value);
 }
  function passwordChange(e) {
   setpassword(e.target.value);
 }
  function jurusanChange(e) {
   setjurusan(e.target.value);
 }
  const ganti= () => {
    setmuncul(!muncul);
  }

  return (
    <>
    {muncul ? (
  <>
    <h1 className="judul">
      pengisian form mahasiswa yai university
    </h1>

    <form className="form">
      <div className="input-group">
        <label>Nama :</label>
        <input type="text" onChange={nameChange} />
      </div>

      <div className="input-group">
        <label>Email :</label>
        <input type="text" onChange={emailChange} />
      </div>

      <div className="input-group">
        <label>Password :</label>
        <input type="password" onChange={passwordChange} />
      </div>

      <div className="jurusan">
        <p>Jurusan:</p>

        <label className="option">
          <input
            type="radio"
            name="jurusan"
            value="Informatika"
            onChange={jurusanChange}
          />
          Informatika
        </label>

        <label className="option">
          <input
            type="radio"
            name="jurusan"
            value="Sistem Informasi"
            onChange={jurusanChange}
          />
          Sistem Informasi
        </label>

        <label className="option">
          <input
            type="radio"
            name="jurusan"
            value="Teknik Komputer"
            onChange={jurusanChange}
          />
          Teknik Komputer
        </label>
      </div>
    </form>
    <button className="tombol" onClick={ganti}> kirim</button>
  </>
) : (
  <>
    <h1 className="judul">
      form mahasiswa yai university
    </h1>
    <div className="form">
      <div className="input-group"> Nama ={nama}</div>
      <div className="input-group"> email ={email}</div>
      <div className="input-group"> jurusan ={jurusan}</div>
    </div>
    <button className="tombol" onClick={ganti}> kembali</button>
  </>
    )
    }
    </>
  );
}

export default Form;