import PropTypes from "prop-types";

export default function Note({ title, item }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{item}</p>
    </div>
  );
}
Note.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};
