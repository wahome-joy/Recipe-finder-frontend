import React, { useState } from 'react';
import axios from 'axios';

const AddRecipes = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    ingredients: [''],
    instructions: [{ step: '', details: '' }],
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

  const handleInstructionChange = (index, field, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index][field] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, { step: '', details: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:5376/api/foods/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Assuming response contains the newly created food data
      setMessage('Recipe added successfully!');
      onSubmit(response.data); // If you need to update parent component with new data
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'Something went wrong'}`);
      } else {
        setMessage('Error: Network or server issue.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients:</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" className="add-button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Instructions:</label>
          {formData.instructions.map((instruction, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Step"
                value={instruction.step}
                onChange={(e) => handleInstructionChange(index, 'step', e.target.value)}
                required
              />
              <textarea
                placeholder="Details"
                value={instruction.details}
                onChange={(e) => handleInstructionChange(index, 'details', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" className="add-button" onClick={addInstruction}>
            Add Instruction
          </button>
        </div>

        <div className="form-group">
          <label>Image URL (optional):</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
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


 