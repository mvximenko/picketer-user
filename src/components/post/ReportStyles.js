import tw, { styled } from 'twin.macro';

export const Top = styled.div`
  ${tw`flex items-center my-6`}
`;

export const Heading = styled.h2`
  ${tw`text-2xl font-semibold leading-tight`}
`;

export const Form = styled.form`
  ${tw`w-full bg-white rounded-lg shadow-md relative flex flex-col mb-10 p-6`}
`;

export const DropArea = styled.div`
  ${tw`
    w-full px-10 py-20 rounded text-center
    border border-dashed border-gray-400 text-gray-400
    transition duration-500 hover:text-white hover:bg-indigo-400
    hover:border-indigo-400 hover:border-solid mb-4  relative
  `}

  ${({ drag }) =>
    drag && tw`text-white bg-indigo-400 border-indigo-400 border-solid`}
`;

export const Input = styled.input`
  ${tw`absolute opacity-0	top-0 left-0 w-full h-full cursor-pointer`}
`;

export const Button = styled.button`
  ${tw`
    bg-indigo-400 hover:bg-indigo-500 text-white
    p-2 rounded transition duration-500
  `}
`;

export const Paragraph = styled.p`
  ${tw`text-xl font-semibold leading-tight`}
`;

export const Container = styled.div`
  ${tw`flex justify-between`}
`;

export const IconWrapper = styled.span`
  ${tw`p-1 m-1 cursor-pointer hover:opacity-50`}

  svg {
    ${tw`w-4 h-4 `}
  }
`;
