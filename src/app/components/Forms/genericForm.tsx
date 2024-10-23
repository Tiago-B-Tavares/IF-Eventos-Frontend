interface FormProps {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
    accept?: string;
    onchange?: () => {}
    value: string;

}

export default function Form({ type, name, label, placeholder, accept, onchange , value}: FormProps) {
    return (
        <div className="flex justify-start w-full flex-col text-left">
            <label className="text-base font-semibold text-green-800 ">{label}</label>
            {type === "textarea" ? (
                <textarea className="border-b-2 px-2  border-b-green-800 font-normal text-orange-700 outline-none  placeholder:text-orange-700 placeholder:opacity-40" name={name} placeholder={placeholder} />
            ) : (<input className="border-b-2 px-2  border-b-green-800 font-normal text-orange-700 outline-none  placeholder:text-orange-700 placeholder:opacity-40" type={type} name={name} placeholder={placeholder} accept={accept} />)
            }
        </div>
    );
}
