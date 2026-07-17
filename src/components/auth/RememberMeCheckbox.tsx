interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const RememberMeCheckbox = ({ checked, onChange }: RememberMeCheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="rememberMe"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
      />
      <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
        Se souvenir de moi
      </label>
    </div>
  );
};

export default RememberMeCheckbox;