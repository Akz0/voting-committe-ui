import { useEffect, useState } from "react";
import { Modal, Select } from "react-daisyui";
import { GoCircleSlash, GoPencil, GoPlus, GoTrashcan } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  CreateNewCandidate,
  DeactivateCandidate,
  DeleteCandidate,
  GetAllCandidates,
  UpdateCandidate,
} from "../store/actions/candidateActions";
import { GetAllElections } from "../store/actions/electionActions";
import { GetAllLocations } from "../store/actions/locationActions";
import { ICandidate } from "../store/reducers/candidateSlice";

const Candidates = () => {
  const [deleteModal, SetDeleteModal] = useState(false);
  const [updateModal, SetUpdateModal] = useState(false);
  const [newModal, SetNewModal] = useState(false);
  const dispatch: any = useDispatch();

  //Main Data List
  const { candidates, loading, error, message } = useSelector(
    (state: any) => state?.candidate
  );
  const locationList = useSelector((state: any) => state?.location?.locations);
  const electionList = useSelector((state: any) => state?.election?.elections);

  //Local Data
  const [currentCandidate, SetCurrentCandidate] = useState<ICandidate>();
  const [name, setName] = useState<string>("");
  const [loginId, setLoginId] = useState<string>("");
  const [election, setElection] = useState<string>(electionList?.[0]?._id);
  const [location, setLocation] = useState<string>(locationList?.[0]?._id);

  useEffect(() => {
    Get();
    dispatch(GetAllLocations(() => {}));
    dispatch(GetAllElections(() => {}));
  }, []);

  const resetLocalData = () => {
    setName("");
    setElection(electionList?.[0]._id);
    setLocation(locationList?.[0]._id);
    setLoginId("");
    SetCurrentCandidate(undefined);
  };
  const Get = () => {
    dispatch(GetAllCandidates(() => {}));
  };

  const Delete = (_id: string) => {
    dispatch(
      DeleteCandidate(_id, () => {
        SetDeleteModal(false);
        Get();
      })
    );
  };

  const Add = () => {
    if (!name || !loginId) {
      alert("Please complete the fields!");
      return;
    }

    const newCandidate = {
      name,
      electionId: election,
      locationId: location,
      loginId,
    };

    dispatch(
      CreateNewCandidate(newCandidate, () => {
        SetNewModal(false);
        Get();
      })
    );
  };

  const Update = () => {
    if (!name || !loginId) {
      alert("Please complete the fields!");
      return;
    }

    const newCandidate = {
      name,
      electionId: election,
      locationId: location,
      loginId,
    };

    dispatch(
      UpdateCandidate(newCandidate, currentCandidate?._id || "", () => {
        SetUpdateModal(false);
        Get();
      })
    );
  };

  const Deactivate = () => {
    dispatch(
      DeactivateCandidate(currentCandidate?._id || "", () => {
        SetUpdateModal(false);
        Get();
        resetLocalData();
      })
    );
  };
  const DeleteModal = () => {
    return (
      <Modal
        id="delete"
        open={deleteModal}
        onClickBackdrop={() => SetDeleteModal(false)}
      >
        <div>
          <div>
            Are you sure you want to delete Candidate{" "}
            <span className="text-primary font-bold">{`${currentCandidate?.name}`}</span>{" "}
            ?
          </div>
          <div className="flex space-x-4">
            <button
              className="modal-action btn hover:border-red-500 bg-red-400 text-white border-red-400 hover:bg-red-500 "
              onClick={() => Delete(currentCandidate?._id || "")}
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
      </Modal>
    );
  };

  const UpdateModal = () => {
    return (
      <Modal
        id="update"
        open={updateModal}
        onClickBackdrop={() => {
          SetUpdateModal(false);
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold py-3">Edit Candidate </h1>
            <div className="flex space-x-4">
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

              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Login ID</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                />
                <label className="label"></label>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Election</span>
                </label>
                <Select
                  placeholder="Type here"
                  value={election}
                  onChange={(e) => setElection(e.target.value)}
                  required
                >
                  {electionList?.map((election: any) => {
                    return (
                      <option key={election._id} value={election._id}>
                        {election.name}
                      </option>
                    );
                  })}
                </Select>
              </div>

              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <Select
                  placeholder="Type here"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  {locationList?.map((location: any) => {
                    return (
                      <option key={location._id} value={location._id}>
                        {location.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="modal-action btn hover:border-green-500 bg-green-400 text-white border-green-400 hover:bg-green-500 "
                onClick={Update}
              >
                Save
              </button>

              {currentCandidate?.active ? (
                <button
                  className="modal-action btn btn-error btn-outline "
                  onClick={Deactivate}
                >
                  <GoCircleSlash />
                  Deactivate
                </button>
              ) : (
                ""
              )}

              <button
                className="modal-action btn btn-ghost "
                onClick={() => {
                  SetUpdateModal(false);
                }}
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
        onClickBackdrop={() => {
          resetLocalData();
          SetNewModal(false);
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold py-3">Create New Candidate</h1>
            <div className="flex space-x-4">
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

              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Login ID</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  required
                />
                <label className="label"></label>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Election</span>
                </label>
                <Select
                  placeholder="Type here"
                  value={election}
                  onChange={(e) => setElection(e.target.value)}
                  required
                >
                  {electionList?.map((election: any) => {
                    return (
                      <option key={election._id} value={election._id}>
                        {election.name}
                      </option>
                    );
                  })}
                </Select>
              </div>

              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <Select
                  placeholder="Type here"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  {locationList?.map((location: any) => {
                    return (
                      <option key={location._id} value={location._id}>
                        {location.name}
                      </option>
                    );
                  })}
                </Select>
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
                onClick={() => {
                  resetLocalData();
                  SetNewModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const RenderTable = () => {
    return (
      <table className="table w-full">
        <thead>
          <tr className="bg-secondary">
            <th></th>
            <th>Name</th>
            <th>Status</th>
            <th>Location</th>
            <th>Election</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {candidates?.map((candidate: ICandidate, index: number) => {
            return (
              <tr key={candidate?._id}>
                <th>{index + 1}</th>
                <td>{candidate?.name}</td>
                <td>
                  {candidate?.active ? (
                    <div className="badge badge-success gap-2">Active</div>
                  ) : (
                    <div className="badge badge-error gap-2">Inactive</div>
                  )}
                </td>
                <td>{candidate?.locationId?.name}</td>
                <td>{candidate?.electionId?.name}</td>
                <td className="icons flex space-x-4">
                  <button
                    className="btn btn-outline btn-warning btn-sm"
                    onClick={() => {
                      SetCurrentCandidate(candidate);
                      setName(candidate?.name);
                      setElection(candidate?.electionId?._id);
                      setLocation(candidate?.locationId?._id);
                      setLoginId(candidate?.loginId);
                      SetUpdateModal(true);
                    }}
                  >
                    <GoPencil />
                  </button>

                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => {
                      SetCurrentCandidate(candidate);
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

  const SearchCandidates = (candidate: string) => {};

  return (
    <div>
      <div className="page-header-bar">
        <p className="text-2xl capitalize font-bold">Candidates</p>

        <input
          type="text"
          placeholder="Search"
          onChange={(e) => SearchCandidates(e.target.value)}
          className="input w-[50%]"
        />
        <button
          className="btn btn-outline btn-primary flex space-x-4"
          onClick={() => {
            resetLocalData();
            SetNewModal(true);
          }}
        >
          <GoPlus />
          <span>Add New Candidate</span>
        </button>
      </div>
      <div className="content-table-div">{RenderTable()}</div>
      {DeleteModal()}
      {UpdateModal()}
      {NewModal()}
    </div>
  );
};

export default Candidates;
