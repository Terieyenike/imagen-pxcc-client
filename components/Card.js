import { download } from "@/public/assets";
import { downloadImage } from "@/utils";

const Card = ({ xata_id, name, prompt, photo }) => {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-full hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md bg-opacity-75'>
        <p className='text-white text-sm overflow-y-auto prompt max-h-24'>
          {prompt}
        </p>

        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {name[0].toUpperCase()}
            </div>
            <p className='text-white text-sm'>{capitalizeFirstLetter(name)}</p>
          </div>
          <button
            type='button'
            onClick={() => downloadImage(xata_id, photo)}
            className='outline-none bg-transparent border-none text-white'>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
