import { any, string, z } from 'zod'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Stack,
  } from '@chakra-ui/react'
import useGenres from '../hooks/useGenres'
import usePlatforms from '../hooks/usePlatforms'
import usePublishers from '../hooks/usePublishers'
import Game from '../entities/Game'
import axios from 'axios'
import { useMutation } from 'react-query'
import { Form } from 'react-router-dom'
import genres from '../data/genres'
import publishers from '../data/publishers'
import platforms from '../data/platforms'

const schema = z.object ({
//   id: z.number().min(1),
//   slug: z.string().min(0),
//   background_image: string,
  name: z.string().min(3, {message: 'Name must contain atleast 3 characters' }),
  // genres: z.nativeEnum(genres.results[].name),
  // publishers: z.string(),
  // parent_platforms: z.string(),
  description_raw: z.string().min(3, {message: 'Description field is required'}),
  metacritic: z.number({invalid_type_error: 'A number for Matacritic field is required'}).min(1),
//   rating_top: number,
}) 

type FormData = z.infer<typeof schema>;

// const addGame = useMutation({
//   mutationFn: (game: Game) =>
//   axios
//   .post('https://api.rawg.io/api/games', + game)
//   .then(res => res.data)
// });

const GameForm =() => {

    const { data: Genre} = useGenres();
    const { data: Platform} = usePlatforms();
    const { data: Publisher} = usePublishers();

    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({resolver: zodResolver(schema)});
    
    const onSubmit = (data: FieldValues, event: Event) => {
      console.log('data', data);
      console.log('event', Event);

      // addGame.mutate({
      //   id: 0,
      //   name: data.name,
      //   slug: data.name,
      //   description_raw: data.description_raw,
      //   genres: [],
      //   publishers: [],
      //   background_image: '',
      //   parent_platforms: [],
      //   metacritic: data.metacritic,
      //   rating_top: 0
      // })
    }

    return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      
  <FormLabel>Game Name</FormLabel>
  <Input {...register("name")} placeholder="Game name" type="text" />
  {errors.name &&(
    <text>{errors.name.message}</text>
  )}

  <FormLabel>Genre</FormLabel>
  <Select placeholder='Select Genre'>
    {Genre?.results.map((genre) => (
          <option key={genre.id}>{genre.name}</option>))}
          {/* {errors.genres &&(
    <text>{errors.genres.message}</text>
    )} */}
  </Select>

<FormLabel>Platforms</FormLabel>
  <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
  <Stack spacing={[1, 5]} direction={['column', 'row']}>
    {Platform?.results.map((platform) => (
          <Checkbox key={platform.id}>{platform.name}</Checkbox>))}
  </Stack>
</CheckboxGroup>

  <FormLabel>Publishers</FormLabel>
  <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
  <Stack spacing={[1, 5]} direction={['column', 'row']}>
    {Publisher?.results.map((publisher) => (
          <Checkbox key={publisher.id}>{publisher.name}</Checkbox>))}
          <Checkbox>Unknown</Checkbox>
   </Stack>
</CheckboxGroup>

  <FormLabel>Description</FormLabel>
  <Input {...register('description_raw')} type='text'/>
  {errors.description_raw &&(
    <text>{errors.description_raw.message}</text>
  )}

  <FormLabel>Metacritic</FormLabel>
  <Input {...register('metacritic', {valueAsNumber: true})} type='number' />
  {errors.metacritic &&(
    <text>{errors.metacritic.message}</text>
  )}

<Button colorScheme='green' type='submit'>Submit</Button>
    </Form>
 );
};

export default GameForm;