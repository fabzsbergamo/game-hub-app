import { z } from 'zod'
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

const schema = z.object ({
//   id: z.number().min(1),
//   slug: z.string().min(0),
//   background_image: string,
  name: z.string().min(3, {message: 'Name must contain atleast 3 characters' }),
  // genres: z.enum(genres),
//   publishers: Publisher[],
//   parent_platforms: { platform: Platform }[],
  description_raw: z.string().min(1, {message: 'Description field is required'}),
  metacritic: z.number({invalid_type_error: 'Matacritic field is required'}).min(0),
//   rating_top: number,
}) 

type FormData = z.infer<typeof schema>;


const GameForm =() => {

    const { data: Genre} = useGenres();
    const { data: Platform} = usePlatforms();
    const { data: Publisher} = usePublishers();

    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({resolver: zodResolver(schema)});

    // const onSubmit = (data: FieldValues) => console.log(data);
    // const handleSubmit = (event: FormEvent) => {
    //     event.preventDefault();
    //     console.log()
    // }

    return (
    <FormControl onSubmit={handleSubmit(data => console.log(data))}>

  <FormLabel>Game Name</FormLabel>
  <Input {...register('name')} type='text' />
  {errors.name &&(
    <text>{errors.name.message}</text>
  )}

  <FormLabel>Genre</FormLabel>
  <Select placeholder='Select Genre'>
    <option></option>
    {Genre?.results.map((genre) => (
          <option key={genre.id}>{genre.name}</option>))}
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
    <FormErrorMessage>{errors.description_raw.message}</FormErrorMessage>
  )}

  <FormLabel>Metacritic</FormLabel>
  <Input {...register('metacritic', {valueAsNumber: true})} type='number' />
  {errors.metacritic &&(
    <FormErrorMessage>{errors.metacritic.message}</FormErrorMessage>
  )}

<Button colorScheme='green' type='submit'>Submit</Button>
    </FormControl>
 );
};

export default GameForm;