import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`container px-4 md:p-0 mx-auto md:w-3/5`}
`;

export const Top = styled.div`
  ${tw`flex items-center my-6`}
`;

export const Heading = styled.h2`
  ${tw`text-2xl font-semibold leading-tight`}
`;

export const Card = styled.div`
  ${tw`
    w-full mb-7 transition-all duration-150 bg-white
    rounded-lg shadow-md
  `}
`;

export const Title = styled.h1`
  ${tw`px-4 py-2 block text-lg my-2 font-bold text-gray-800`}
`;

export const HR = styled.hr`
  ${tw`border-gray-300`}
`;

export const Description = styled.p`
  ${tw`w-full px-4 py-2 my-2 text-justify text-gray-700`}
`;
export const Location = styled.div`
  ${tw`text-gray-700 px-4 py-2 my-2`}
`;

export const Picketer = styled.div`
  ${tw`text-gray-700 px-4 pt-2 mt-2`}
`;

export const DateInfo = styled.p`
  ${tw`px-4 pb-2 mb-2 flex justify-end text-xs text-gray-600`}
`;

export const Button = styled.button`
  ${tw`
    bg-red-500 hover:bg-red-600 text-white
    p-2 rounded transition duration-500 w-full mb-10
  `}
`;
