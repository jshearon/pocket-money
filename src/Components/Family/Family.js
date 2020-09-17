import React from 'react';

import FamilyThumbnail from '../FamilyThumbnail/FamilyThumbnail';

class Family extends React.Component {
  componentDidMount() {
    this.props.updateFamily(this.props.familyId, this.props.userId);
  }

  render() {
    const { family } = this.props;
    const familyThumbnails = family.map((member) => <FamilyThumbnail key={member.id} member={member} />);
    return (
      familyThumbnails
    );
  }
}

export default Family;
