import tw, { styled } from 'twin.macro';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  ${tw`container px-4 md:p-0 mx-auto md:w-3/5`}
`;

export const Top = styled.div`
  ${tw`flex items-center my-5`}
`;

export const Heading = styled.h2`
  ${tw`text-2xl font-semibold leading-tight`}
`;

export const CreateLink = styled(Link)`
  ${tw`
    mx-auto sm:ml-auto mr-0 px-3 py-2 font-semibold
    text-white leading-tight rounded-md bg-indigo-500
    hover:bg-indigo-600 transition ease-in duration-300
  `}
`;

export const Card = styled.div`
  ${tw`
    w-full mb-5 transition-all duration-150 bg-white
    rounded-lg shadow-lg hover:shadow-xl
  `}
`;

export const StyledLink = styled(Link)`
  ${tw`px-4 py-2 hover:underline block`}
`;

export const Title = styled.h1`
  ${tw`text-lg my-2 font-bold text-gray-800`}
`;

export const HR = styled.hr`
  ${tw`border-gray-300`}
`;

export const Description = styled.p`
  ${tw`w-full px-4 py-2 my-2 text-sm text-justify text-gray-700`}
`;
export const Location = styled.div`
  ${tw`font-semibold text-gray-700 px-4 py-2 my-2`}
`;

export const Picketer = styled.div`
  ${tw`font-semibold text-gray-700 px-4 pt-2 mt-2`}
`;

export const DateInfo = styled.p`
  ${tw`px-4 pb-2 mb-2 flex justify-end text-xs text-gray-600`}
`;
