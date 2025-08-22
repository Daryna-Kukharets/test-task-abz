import { useEffect, useState } from "react";
import { fetchPositions, Position } from "../../api/positions";
import { Loader } from "../Loader/Loader";

type Props = {
  selectedId: number;
  onChange: (id: number) => void;
};

export const PositionRadio: React.FC<Props> = ({ selectedId, onChange }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPositions = async () => {
      setLoading(true);

      const data = await fetchPositions();

      if (data.success && data.positions) {
        setPositions(data.positions);

        if (!selectedId && data.positions.length > 0) {
          onChange(data.positions[0].id);
        }
      }

      setLoading(false);
    };

    loadPositions();
  }, []);

  return (
    <div className="position">
      <p className="position__subtitle">Select your position</p>
      {loading ? (
        <Loader />
      ) : (
        <div className="position__list">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className={`position__customRadio ${
                selectedId === pos.id ? "position__customRadio--active" : ""
              }`}
              onClick={() => onChange(pos.id)}
            >
              <span className="position__circle" />
              <span className="position__label">{pos.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
