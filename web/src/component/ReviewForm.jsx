// import { useState } from 'react';
// import '../App.css';

// export default function ReviewForm() {

//   const [formData, setFormData] = useState({
//     name: '',
//     rating: '',
//     comment: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch('http://localhost:5000/api/reviews', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     });

//     const data = await response.json();

//     alert(data.message);
//   };

//   return (
//     <form className="review-form" onSubmit={handleSubmit}>
//       <h2>Leave a Review</h2>

//       <input
//         type="text"
//         placeholder="Your Name"
//         required
//         onChange={(e) =>
//           setFormData({ ...formData, name: e.target.value })
//         }
//       />

//       <select
//         required
//         onChange={(e) =>
//           setFormData({ ...formData, rating: e.target.value })
//         }
//       >
//         <option value="">Select Rating</option>
//         {[5,4,3,2,1].map(num => (
//           <option key={num} value={num}>{num} Stars</option>
//         ))}
//       </select>

//       <textarea
//         placeholder="Tell us what you think..."
//         onChange={(e) =>
//           setFormData({ ...formData, comment: e.target.value })
//         }
//       />

//       <button type="submit">Submit Review</button>
//     </form>
//   );
// }

import { useState } from 'react';
import '../App.css';

export default function ReviewForm() {

  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    comment: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch('http://localhost:7000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          rating: Number(formData.rating),
          comment: formData.comment
        })
      });

      const data = await response.json();

      alert(data.message);

      // reset form
      setFormData({
        name: '',
        rating: '',
        comment: ''
      });

    } catch (error) {

      console.error("Error submitting review:", error);
      alert("Failed to submit review");

    } finally {

      setLoading(false);

    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Leave a Review</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        value={formData.name}
        onChange={handleChange}
      />

      <select
        name="rating"
        required
        value={formData.rating}
        onChange={handleChange}
      >
        <option value="">Select Rating</option>
        {[5,4,3,2,1].map(num => (
          <option key={num} value={num}>
            {num} Stars
          </option>
        ))}
      </select>

      <textarea
        name="comment"
        placeholder="Tell us what you think..."
        value={formData.comment}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}