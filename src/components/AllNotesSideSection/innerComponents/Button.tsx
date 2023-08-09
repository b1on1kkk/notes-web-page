import "../LeftSideSectionStyles.css";

import more_icon from "../../../icons/3844442_dot_menu_more_vertical_icon.png";

interface ButtonProps {
  index: number;
  getIndex: (index: number) => void;
}

export const Button: React.FC<ButtonProps> = ({
  index,
  getIndex,
}): JSX.Element => {
  return (
    <button onClick={() => getIndex(index)} title="Note settings">
      <img src={more_icon} alt="more" width={18} />
    </button>
  );
};
