import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useGetCommentQuery, usePostCommentMutation } from '@/redux/api/apiSlice';
import { toast } from './ui/use-toast';

// const dummyComments = [
//   'Bhalo na',
//   'Ki shob ghori egula??',
//   'Eta kono product holo ??',
//   '200 taka dibo, hobe ??',
// ];

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const { data, isLoading: isLoadComment, refetch } = useGetCommentQuery(id);
  const [postComment, { isLoading }] = usePostCommentMutation();
  
  const handleSubmit = async  (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);
    if (!inputValue) {
      toast({
        description: 'please write your comment',
      });
      return;
    }
    await postComment({ id, data: { comment: inputValue } });
    await refetch();
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      {isLoading && <p>Loading...</p>}
      {
        isLoadComment ? <p>Loading...</p> :
          <div className="mt-10">
            {data?.comments?.slice().reverse().map((comment: string | null, index: number) => (
              comment &&
              <div key={index} className="flex gap-3 items-center mb-5">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{comment}</p>
              </div>
            ))}
          </div>
      }
    </div>
  );
}