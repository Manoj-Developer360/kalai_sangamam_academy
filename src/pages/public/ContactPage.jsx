import React, { useEffect, useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout.jsx';
import Contact from '../../components/common/Contact.jsx';
import { publicService } from '../../services/publicService';

const ContactPage = () => {
  const [site, setSite] = useState(null);

  useEffect(() => {
    publicService.getSiteSettings().then(({ data }) => setSite(data.data)).catch(() => {});
  }, []);

  return (
    <PublicLayout>
      <div className="pt-20 lg:pt-24">
        <Contact site={site} />
      </div>
    </PublicLayout>
  );
};

export default ContactPage;
