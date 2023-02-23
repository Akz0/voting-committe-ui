import { useEffect, useState } from "react";
// import Modal from "../components/Modal";
import { Modal } from "react-daisyui";
import { GoPencil, GoPlus, GoTrashcan } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  CreateNewLocation,
  DeleteLocation,
  GetAllLocations,
  UpdateLocation,
} from "../store/actions/locationActions";
const Locations = () => {
  const [deleteModal, SetDeleteModal] = useState(false);
  const [updateModal, SetUpdateModal] = useState(false);
  const [newModal, SetNewModal] = useState(false);
  const { loading, message, locations } = useSelector(
    (state: any) => state?.location
  );

  const [name, setName] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  const dispatch: any = useDispatch();

  const [currentLocation, SetCurrentLocation] = useState<{
    name: string;
    zip: string;
    _id: string;
    createdBy: string;
  }>({ name: "", zip: "", _id: "", createdBy: "" });

  useEffect(() => {
    Get();
  }, []);

  const Delete = (_id: string) => {
    dispatch(
      DeleteLocation(_id, () => {
        SetDeleteModal(false);
        Get();
      })
    );
  };

  const Add = () => {
    dispatch(
      CreateNewLocation({ name: name, zip: zip }, () => {
        SetNewModal(false);
        setZip("");
        setName("");
        Get();
      })
    );
  };

  const Update = () => {
    dispatch(
      UpdateLocation(
        { name: currentLocation?.name, zip: currentLocation?.zip },
        currentLocation?._id,
        () => {
          SetUpdateModal(false);
          Get();
        }
      )
    );
  };

  const Get = () => {
    dispatch(GetAllLocations(() => {}));
  };
  const DeleteModal = () => {
    return (
      <Modal
        id="delete"
        open={deleteModal}
        onClickBackdrop={() => SetDeleteModal(false)}
      >
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div>
              Are you sure you want to delete location{" "}
              <span className="font-bold text-primary">{`${currentLocation?.name}`}</span>{" "}
              ?
            </div>
            <div className="flex space-x-4">
              <button
                className="modal-action btn hover:border-red-500 bg-red-400 text-white border-red-400 hover:bg-red-500 "
                onClick={() => Delete(currentLocation?._id || "")}
              >
                Delete
              </button>

              <button
                className="modal-action btn btn-ghost "
                onClick={() => SetDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const UpdateModal = () => {
    return (
      <Modal
        id="update"
        open={updateModal}
        onClickBackdrop={() => SetUpdateModal(false)}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold py-3">Edit Location</h1>
            <div className="w-full">
              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={currentLocation?.name}
                  onChange={(e) =>
                    SetCurrentLocation((prevState) => {
                      return { ...prevState, name: e.target.value };
                    })
                  }
                  required
                />
                <label className="label"></label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Zip</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={currentLocation?.zip}
                  onChange={(e) =>
                    SetCurrentLocation((prevState) => {
                      return { ...prevState, zip: e.target.value };
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="modal-action btn hover:border-green-500 bg-green-400 text-white border-green-400 hover:bg-green-500 "
                onClick={Update}
              >
                Save
              </button>

              <button
                className="modal-action btn btn-ghost "
                onClick={() => SetUpdateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const NewModal = () => {
    return (
      <Modal
        id="new"
        open={newModal}
        onClickBackdrop={() => SetNewModal(false)}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold py-3">Create New Location</h1>
            <div className="w-full">
              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label className="label"></label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Zip</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="modal-action btn hover:border-green-500 bg-green-400 text-white border-green-400 hover:bg-green-500 "
                onClick={Add}
              >
                Save
              </button>

              <button
                className="modal-action btn btn-ghost "
                onClick={() => SetNewModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const SearchLocations = (location: string) => {};

  const RenderTable = () => {
    return loading ? (
      <Loader />
    ) : (
      <table className="table w-full">
        <thead>
          <tr className="bg-secondary">
            <th></th>
            <th>Name</th>
            <th>ZipCode</th>
            <th>Created By</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location: any, index: any) => {
            return (
              <tr key={location?._id}>
                <th>{index + 1}</th>
                <td className="font-bold">{location?.name}</td>
                <td>{location?.zip}</td>
                <td>{location?.createdBy?.name}</td>
                <td className="icons flex space-x-4">
                  <button
                    className="btn btn-outline btn-warning btn-sm"
                    onClick={() => {
                      SetCurrentLocation(location);
                      SetUpdateModal(true);
                    }}
                  >
                    <GoPencil />
                  </button>

                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => {
                      SetCurrentLocation(location);
                      SetDeleteModal(true);
                    }}
                  >
                    <GoTrashcan />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className="page-header-bar">
        <p className="text-2xl capitalize font-bold">Locations</p>

        <input
          type="text"
          placeholder="Search"
          onChange={(e) => SearchLocations(e.target.value)}
          className="input w-[50%]"
        />
        <button
          className="btn btn-outline btn-primary flex space-x-4"
          onClick={() => {
            SetNewModal(true);
          }}
        >
          <GoPlus />
          <span>Add New Location</span>
        </button>
      </div>
      <div className="content-table-div">{RenderTable()}</div>
      {DeleteModal()}
      {UpdateModal()}
      {NewModal()}
    </div>
  );
};

export default Locations;
