import React, { useState } from 'react';
import './home.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

function Home() {
    const [budget, setBudget] = useState('');
    const [color, setColor] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [invalidFields, setInvalidFields] = useState([]);
    const navigate = useNavigate()
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Reset previous invalid fields
        setInvalidFields([]);

        // Validate inputs
        const invalidFieldsList = [];
        if (budget.trim() === '') {
            invalidFieldsList.push('budget');
        }
        if (color.trim() === '') {
            invalidFieldsList.push('color');
        }
        if (roomTypes.length === 0) {
            invalidFieldsList.push('roomType');
        }

        if (invalidFieldsList.length > 0) {
            setInvalidFields(invalidFieldsList);
            return;
        }

        // Construct Google Shopping search URL
        const selectedRoomTypes = roomTypes.join(', ');
        const url = `/furnitureSearch?color=${color}&maxPrice=${budget}&category=${roomTypes.join(',')}`;
       navigate(url)
      
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setRoomTypes([...roomTypes, value]);
        } else {
            setRoomTypes(roomTypes.filter(type => type !== value));
        }
    };

    return (
        <div>
            <div className="heading">
                <h1>Welcome to Customcart</h1>
                <h3>Unlock your dream space Customcart - Where every detail fits perfectly</h3>
            </div>
            <div className="card">
                <h3>CUSTOMISE YOUR DESIGN</h3>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="budget">Budget Range:</label>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        required
                    />
                    <label htmlFor="color">Select Color:</label>
                    <select
                        id="color"
                        name="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        <option value="">Select Color</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                    </select>
                    <label>Room Type:</label>
                    <div>
                        <input
                            type="checkbox"
                            id="bedroom"
                            name="roomType"
                            value="bedroom"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="bedroom">Bedroom</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="livingRoom"
                            name="roomType"
                            value="living room"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="livingRoom">Living Room</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="balcony"
                            name="roomType"
                            value="balcony"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="balcony">Balcony</label>
                    </div>
                  
                    <div className="button-container">
                        <button type="submit" className="see-products-button">SEE PRODUCTS</button>
                    </div>
                </form>
                {invalidFields.includes('budget') && <p className="error-message">Please enter budget</p>}
                {invalidFields.includes('color') && <p className="error-message">Please select color</p>}
                {invalidFields.includes('roomType') && <p className="error-message">Please select at least one room type</p>}
            </div>
        </div>
    );
}

export default Home;
