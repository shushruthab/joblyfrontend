import { Button, Grid, Input, Spacer } from '@nextui-org/react';
import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ( {searchFor}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }
    

    return (
        <div>
        
              
        <form className="form-inline" onSubmit={handleSubmit}>
        <Grid.Container>
        <Grid xs={6} justify="flex-end" css={{marginTop: "30px", marginBottom: "20px"}}>
        <Spacer y={0.5} />
          <Input
          clearable
          bordered
          placeholder='Enter a search term..'
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          
          />
          </Grid>
          <Grid xs={6} justify="flex-start" css={{marginTop: "30px", marginBottom: "20px"}}>
          <Spacer y={0.5} />
         
          <Button type='submit'>Submit</Button>
        
          </Grid>
        </Grid.Container>
        </form>
        
      </div>
    )

}

export default SearchForm;