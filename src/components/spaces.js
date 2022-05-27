import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import casa from "../images/casa.png";
import apto from "../images/apto.png";
import sala from "../images/sala.png";
import kit from "../images/kit.png";
import comedor from "../images/comedor.png";
const lan = navigator.language || navigator.userLanguage;

export default function Component() {
  const URL =
    lan === "en"
      ? "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json"
      : "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  const [spaces, setSpaces] = useState([]);
  const url2 =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

  // const [poster, setPoster] = useState("");
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  const [idRoom, setId] = useState("");
  const [detailRooms, setDetailRooms] = useState(false);
  const [detailDevice, setDetailDevice] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("movies") === null) {
        setSpaces([]);
      } else {
        setSpaces(localStorage.getItem("movies"));
      }
    } else {
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setSpaces(res);
          localStorage.setItem("movies", res);
        });

      fetch(url2)
        .then((res) => res.json())
        .then((res) => {
          setRooms(res);
        });
    }
  }, [URL]);

  const showDetail = (space) => {
    // setCast(movie.cast);
    // setDescription(movie.description);
    // setName(movie.name);
    setId(space.id);
    setDetailRooms(true);
    setDetailDevice(false);
  };

  const showDetailDevice = (device) => {
    setDetailDevice(true);
    setDevices(device.devices);
  };

  const getImgSpace = (space) => {
    if (space.type === "house") return casa;
    else if (space.type === "loft") return apto;
  };

  const getImgRoom = (room) => {
    if (room.name === "Living room") return sala;
    else if (room.name === "Kitchen") return kit;
    else if (room.name === "Dinner room") return comedor;
  };

  const detailCompDevice = (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">
            <FormattedMessage id="Device" />
          </th>
          <th scope="col">
            <FormattedMessage id="Value" />
          </th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{device.id}</td>
            <td>{device.name}</td>
            <td>{device.desired.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const detailCompRooms = (
    <>
      <div className="row">
        <h1>
          <FormattedMessage id="MyRooms" />
        </h1>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {rooms
              .filter((room) => room.homeId === idRoom)
              .map((device, i) => (
                <div
                  className="col-4"
                  key={i}
                  onClick={() => showDetailDevice(device)}
                >
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{device.name}</h5>
                      <p className="card-text">
                        {device.address}
                        <br />
                      </p>
                    </div>
                    <img
                      src={getImgRoom(device)}
                      className="card-img-top"
                      alt="Room"
                      height={153}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        {detailDevice ? <div className="col-6">{detailCompDevice}</div> : null}
      </div>
    </>
  );

  return (
    <>
      <div className="row">
        <h1>
          {" "}
          <FormattedMessage id="MySpaces" />{" "}
        </h1>
      </div>
      <div className="row">
        {spaces.map((space, i) => (
          <div
            className="col-4"
            key={space.id}
            onClick={() => showDetail(space)}
          >
            <div className="card">
              <img
                src={getImgSpace(space)}
                className="card-img-top"
                alt="Poster pelicula"
                height={153}
              />
              <div className="card-body">
                <h5 className="card-title">{space.name}</h5>
                <p className="card-text">
                  {space.address}
                  <br />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {detailRooms ? detailCompRooms : null}
    </>
  );
}
