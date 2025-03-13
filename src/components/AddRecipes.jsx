import React, { useState } from 'react';
import axios from 'axios';
// import { data } from 'react-router-dom';

const AddRecipes = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    ingredients: [''],
    instructions: [{}],
    image_url: '',
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = { ...formData.instructions[0], [`step${index + 1}`]: value };
    setFormData({
      ...formData,
      instructions: [newInstructions],
    });
  };
  

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const addInstruction = () => {
    const stepNumber = Object.keys(formData.instructions[0] || {}).length + 1;
    setFormData({
      ...formData,
      instructions: [{ ...formData.instructions[0], [`step${stepNumber}`]: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Ensure step keys are properly quoted
      const formattedInstructions = JSON.parse(JSON.stringify(formData.instructions));

      const formattedData = {
        ...formData,
        instructions: formattedInstructions, // Now with properly quoted step keys
      };

      console.log("Sending Data:", JSON.stringify(formattedData, null, 2));

      const response = await axios.post('http://127.0.0.1:5376/api/foods/', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data.message);
      
      setMessage(response.data.message);
      onSubmit(response.data);
    } catch (error) {
      setMessage(
        error.response ? `Error: ${error.response.data.message || 'Something went wrong'}` : 'Error: Network or server issue.'
      );
    } finally {
      setIsSubmitting(false);
      setFormData({
        name: '',
        category: '',
        ingredients: [''],
        instructions: [{}],
        image_url: '',
      })
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Ingredients:</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input type="text" value={ingredient} onChange={(e) => handleIngredientChange(index, e.target.value)} required />
            </div>
          ))}
          <button type="button" className="add-button" onClick={addIngredient}>Add Ingredient</button>
        </div>

        <div className="form-group">
          <label>Instructions:</label>
          {Object.keys(formData.instructions[0] || {}).map((key, index) => (
            <div key={index}>
              <textarea
                placeholder={`Step ${index + 1}`}
                value={formData.instructions[0][key]}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" className="add-button" onClick={addInstruction}>Add Instruction</button>
        </div>

        <div className="form-group">
          <label>Image URL (optional):</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRecipes;

 