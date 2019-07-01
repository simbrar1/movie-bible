import React from 'react'

const MoviesForm = ({ data, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="field">
      <label className="label">Name</label>
      <div className="control">
        <input
          className="input"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={data.name || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Year</label>
      <div className="control">
        <input
          className="input"
          name="year"
          placeholder="Year"
          onChange={handleChange}
          value={data.year || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Image</label>
      <div className="control">
        <input
          className="input"
          name="image"
          placeholder="Image"
          onChange={handleChange}
          value={data.image || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Description</label>
      <div className="control">
        <textarea
          className="textarea"
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={data.description || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Star Rating</label>
      <div className="control">
        <input
          className="input"
          name="starRating"
          placeholder="starRating"
          onChange={handleChange}
          value={data.starRating || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Production</label>
      <div className="control">
        <input
          className="input"
          name="production"
          placeholder="production"
          onChange={handleChange}
          value={data.production || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Link</label>
      <div className="control">
        <input
          className="input"
          name="link"
          placeholder="Link"
          onChange={handleChange}
          value={data.link || ''}
        />
      </div>
    </div>
    <button type="submit" className="button is-info">Submit</button>
  </form>
)

export default MoviesForm
