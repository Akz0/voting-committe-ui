import { useEffect, useState } from "react";
import { Modal, Select } from "react-daisyui";
import {
  GoCircleSlash,
  GoPencil,
  GoPlus,
  GoTrashcan,
  GoX,
} from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

import { GetAllElections } from "../store/actions/electionActions";
import { GetAllLocations } from "../store/actions/locationActions";
import {
  CreateNewVoter,
  DeleteVoter,
  GetAllVoters,
  UpdateVoter,
  VerifyVoter,
} from "../store/actions/voterActions";
import { IVoter } from "../store/reducers/voterSlice";

const Voters = () => {
  const [deleteModal, SetDeleteModal] = useState(false);
  const [updateModal, SetUpdateModal] = useState(false);
  const [newModal, SetNewModal] = useState(false);
  const dispatch: any = useDispatch();

  //Main Data List
  const { voters, loading, error, message } = useSelector(
    (state: any) => state?.voter
  );
  const locationList = useSelector((state: any) => state?.location?.locations);
  const electionList = useSelector((state: any) => state?.election?.elections);

  //Local Data
  const [currentVoter, setCurrentVoter] = useState<IVoter>();
  const [name, setName] = useState<string>("");
  const [loginId, setLoginId] = useState<string>("");
  const [location, setLocation] = useState<string>(locationList?.[0]._id);
  const [status, setStatus] = useState<string>("incomplete");
  const [elections, setElections] = useState<
    {
      _id: string;
      name: string;
    }[]
  >([]);
  //
  const [newElection, setNewElection] = useState<string>(electionList?.[0]._id);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    Get();
    dispatch(GetAllLocations(() => {}));
    dispatch(GetAllElections(() => {}));
  }, []);

  const resetLocalData = () => {
    setName("");
    setStatus("incomplete");
    setElections([]);
    setLocation(locationList?.[0]._id);
    setLoginId("");
    setCurrentVoter(undefined);
    setPassword("");
  };
  const Get = () => {
    dispatch(GetAllVoters(() => {}));
  };

  const Delete = (_id: string) => {
    dispatch(
      DeleteVoter(_id, () => {
        SetDeleteModal(false);
        Get();
      })
    );
  };

  const Add = () => {
    if (!name || !loginId || !password) {
      alert("Please complete the fields!");
      return;
    }
    if (!elections || !location) {
      alert("Please complete the fields!");
      return;
    }
    const newVoter = {
      name,
      elections: elections.map((election: any) => election?._id),
      locationId: location,
      loginId,
      status,
      password,
    };

    dispatch(
      CreateNewVoter(newVoter, () => {
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

    const newVoter = {
      name,
      electionId: elections.map((election: any) => election?._id),
      locationId: location,
      loginId,
    };

    dispatch(
      UpdateVoter(newVoter, currentVoter?._id || "", () => {
        SetUpdateModal(false);
        Get();
      })
    );
  };

  const Verify = () => {
    dispatch(
      VerifyVoter(currentVoter?._id || "", () => {
        SetUpdateModal(false);
        Get();
        resetLocalData();
      })
    );
  };

  const AddNewElectionToVoter = () => {
    const exists = elections?.findIndex(
      (item: any) => item?._id === newElection
    );
    if (exists !== -1) {
      return;
    }
    const election = electionList.find((item: any) => {
      return newElection === item._id;
    });

    const electionId = {
      name: election?.name,
      _id: election?._id,
    };

    const newElections = [...elections];
    newElections.push(electionId);
    console.log(newElections);
    setElections(newElections);

    console.log(newElections);
  };

  const RemoveElectionFromElections = (id: string) => {
    const newElections = [...elections];
    const index = newElections.findIndex((item: any) => {
      return item._id === id;
    });
    if (index !== -1) {
      newElections.splice(index, 1);
      setElections(newElections);
    }
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
            Are you sure you want to delete{" "}
            <span className="text-primary font-bold">{`${currentVoter?.name}`}</span>{" "}
            ?
          </div>
          <div className="flex space-x-4">
            <button
              className="modal-action btn hover:border-red-500 bg-red-400 text-white border-red-400 hover:bg-red-500 "
              onClick={() => Delete(currentVoter?._id || "")}
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
            <h1 className="text-2xl font-bold py-3">Edit Voter </h1>
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
                  <span className="label-text">Status</span>
                </label>
                <Select
                  placeholder="Type here"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                  <option value="invalid">Invalid</option>
                  <option value="missed">Missed</option>
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

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Elections</span>
              </label>
              <div className="flex space-x-4">
                <Select
                  value={newElection}
                  onChange={(e) => {
                    setNewElection(e.target.value);
                  }}
                  className="select w-full"
                >
                  {electionList?.map((election: any) => {
                    return (
                      <option key={election._id} value={election._id}>
                        {election.name}
                      </option>
                    );
                  })}
                </Select>
                <button
                  className="btn  btn-outline btn-primary"
                  onClick={AddNewElectionToVoter}
                >
                  Add
                </button>
              </div>
              <div>
                <ul className="locations-list">
                  {elections &&
                    elections?.map((election) => {
                      return (
                        <li
                          key={election?._id}
                          className="rounded-md border-b flex justify-between items-center p-2"
                        >
                          <span>{election?.name}</span>
                          <span
                            className="icons btn btn-error btn-sm btn-outline"
                            onClick={() =>
                              RemoveElectionFromElections(election?._id)
                            }
                          >
                            <GoX />
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="modal-action btn hover:border-green-500 bg-green-400 text-white border-green-400 hover:bg-green-500 "
                onClick={Update}
              >
                Save
              </button>

              {!currentVoter?.isVerified ? (
                <button
                  className="modal-action btn btn-secondary btn-outline "
                  onClick={Verify}
                >
                  Verify
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
        id="update"
        open={newModal}
        onClickBackdrop={() => {
          SetNewModal(false);
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold py-3">Create New Voter </h1>
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
                  <span className="label-text">Status</span>
                </label>
                <Select
                  placeholder="Type here"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                  <option value="invalid">Invalid</option>
                  <option value="missed">Missed</option>
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

            <div className="flex space-x-4 mt-4">
              <div className="form-control w-full max-w-xs bo">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Elections</span>
              </label>
              <div className="flex space-x-4">
                <Select
                  value={newElection}
                  onChange={(e) => {
                    setNewElection(e.target.value);
                  }}
                  className="select w-full"
                >
                  {electionList?.map((election: any) => {
                    return (
                      <option key={election._id} value={election._id}>
                        {election.name}
                      </option>
                    );
                  })}
                </Select>
                <button
                  className="btn  btn-outline btn-primary"
                  onClick={AddNewElectionToVoter}
                >
                  Add
                </button>
              </div>
              <div>
                <ul className="locations-list">
                  {elections &&
                    elections?.map((election) => {
                      return (
                        <li
                          key={election?._id}
                          className="rounded-md border-b flex justify-between items-center p-2"
                        >
                          <span>{election?.name}</span>
                          <span
                            className="icons btn btn-error btn-sm btn-outline"
                            onClick={() =>
                              RemoveElectionFromElections(election?._id)
                            }
                          >
                            <GoX />
                          </span>
                        </li>
                      );
                    })}
                </ul>
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
          {voters?.map((voter: IVoter, index: number) => {
            return (
              <tr key={voter?._id}>
                <th>{index + 1}</th>
                <td>{voter?.name}</td>
                <td>
                  {voter?.isVerified ? (
                    <div className="badge badge-success gap-2">Verified</div>
                  ) : (
                    <div className="badge badge-error gap-2">Not Verified</div>
                  )}

                  <div className="badge badge-outline gap-2 capitalize">
                    {voter?.status}
                  </div>
                </td>
                <td>{voter?.locationId?.name}</td>
                <td className="icons flex space-x-4">
                  <button
                    className="btn btn-outline btn-warning btn-sm"
                    onClick={() => {
                      setCurrentVoter(voter);
                      setName(voter?.name);
                      setElections(voter?.elections);
                      setLocation(voter?.locationId?._id);
                      setLoginId(voter?.loginId);
                      SetUpdateModal(true);
                      setStatus(voter?.status);
                    }}
                  >
                    <GoPencil />
                  </button>

                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => {
                      setCurrentVoter(voter);
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
        <p className="text-2xl capitalize font-bold">Voters</p>

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
          <span>Add New Voter</span>
        </button>
      </div>
      <div className="content-table-div">{RenderTable()}</div>
      {DeleteModal()}
      {UpdateModal()}
      {NewModal()}
    </div>
  );
};

export default Voters;
