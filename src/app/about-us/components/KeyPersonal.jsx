import React from "react";
import { User } from "lucide-react";

function KeyPersonnel({ personnels , color , primaryColor }) {
  if (!personnels || personnels.length === 0) return null;

  console.log(primaryColor)

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-white mb-6 text-center uppercase ">
        Key &nbsp;

        <span className={`bg-gradient-to-r ${color[0]} ${color[1]} text-transparent text-3xl font-extrabold uppercase bg-clip-text`}>
            Personnels
        </span>
      </h2>

      <div className="flex items-center justify-center gap-6 ">

        {personnels.map((person, index) => (

          <div
            key={index}
            className={`flex flex-col items-center bg-white/5 rounded-lg shadow-md hover:shadow-lg transition p-5 border ${primaryColor.border}`}
          >
            <div className={`w-20 h-20 bg-gradient-to-r ${color[0]} ${color[1]}  text-white flex items-center justify-center rounded-full text-lg font-bold mb-3`}>
              {person.name.charAt(0)}
            </div>
            <h3 className="text-sm font-semibold text-white text-center">
              {person.name}
            </h3>
            <p className="text-xs text-gray-400 text-center">
              {person.role}
            </p>

            <p className="text-xs text-gray-500 text-center mt-1">
              {person.experience}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyPersonnel;
