import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import PropTypes from "prop-types";

const CustomSelect = ({ label, options, selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-[120px] text-sm font-raleway text-[#767575]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-4 py-[6px] border border-gray-300 rounded-md bg-white hover:bg-gray-50"
      >
        <span>{selected === "Todos" ? label : selected}</span>
        <FaChevronDown
          className={`ml-2 transition-transform text-xs ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white shadow-md rounded-md z-10 py-1">
          {options.map((opt, index) => (
            <div key={opt}>
              {index > 0 && <div className="border-t border-gray-200 mx-2" />}
              <button
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{opt}</span>
                {selected === opt && (
                  <FaCheck className="text-sm text-gray-700" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
