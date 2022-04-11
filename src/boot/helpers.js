const helpers = {
  removeSpecialCharacters(value)
  {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  },
  addDays(date, days)
  {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  jsonLd(job)
  {
    const today = new Date();
    const expires = this.addDays(today, job.meta.publishDays);
    const result = {
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: job.jobTitle,
      description: '<p>' + job.intro + '</p><p><b>' + job.taskLabel + '</b><br>' + job.tasks + '</p><p><br><b>' + job.profileLabel + '</b><br>' + job.profile + '</p><p><br><b>' + job.offerLabel + '</b><br>' + job.offer + '</p><p><b>' + job.contactInfoLabel + '</b><br>' + job.contactInfo + '</p>',
      identifier:
        {
          '@type': 'PropertyValue',
          name: job.organization,
          value: job.reference,
        },
      datePosted: today.toISOString().slice(0, 10),
      validThrough: expires.toISOString().slice(0, 10),
      hiringOrganization: {
        '@type': 'Organization',
        name: job.organization,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.location.addressLocality,
          streetAddress: job.location.streetAddress,
          addressRegion: job.location.addressRegion,
          addressCountry: job.location.addressCountry,
        }
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.meta.salary.value.split('|').map(item => item + '000')[0],
          maxValue: job.meta.salary.value.split('|').map(item => item + '000')[1],
          unitText: 'YEAR'
        }
      },
      jobLocationType: job.meta.remoteWorkPercentage === 100 ? 'TELECOMMUTE' : ''
    };
    const employment = job.meta.workKind.map(item => ({
      freelance: 'OTHER',
      contract: 'CONTRACTOR',
    }[item])).concat(job.meta.workDuration.map(item => ({
      fulltime: 'FULL_TIME',
      parttime: 'PART_TIME',
    }[item])));
    if (employment > 0) result.employmentType = employment;
    if (job.applyURL) result.directApply = true;
    return result;
  },
};
export default ({ app }) =>
{
  app.config.globalProperties.$helpers = helpers;
};
export { helpers };
