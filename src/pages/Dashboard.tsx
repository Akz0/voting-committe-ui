import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { GetAllCandidates } from "../store/actions/candidateActions";
import { GetAllElections } from "../store/actions/electionActions";
import { GetAllLocations } from "../store/actions/locationActions";
import { GetAllVoters } from "../store/actions/voterActions";

const Dashboard = () => {
  const { location, election, candidate, voter } = useSelector(
    (state: any) => state
  );

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(GetAllCandidates(() => {}));
    dispatch(GetAllElections(() => {}));
    dispatch(GetAllVoters(() => {}));
    dispatch(GetAllLocations(() => {}));
    setLoading(false);
  });
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="page-header-bar">
        <p className="text-2xl capitalize font-bold">Dashboard</p>
      </div>

      <div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary"></div>
            <div className="stat-title">Total Voters</div>
            <div className="stat-value text-primary">
              {voter?.voters?.length}
            </div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Candidates</div>
            <div className="stat-value text-secondary">
              {candidate?.candidates?.length}
            </div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Locations</div>
            <div className="stat-value text-secondary">
              {location?.locations?.length}
            </div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary"></div>
            <div className="stat-title">Elections</div>
            <div className="stat-value text-secondary">
              {election?.elections?.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
