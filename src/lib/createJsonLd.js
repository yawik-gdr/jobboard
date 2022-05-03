import JobPosting from 'src/assets/JobPosting.json';

function addDays(date, days)
{
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function createJsonLd(job)
{
  const today = new Date();
  const expires = addDays(today, job.meta.publishDays);
  const o = JobPosting;

  o.title = job.jobTitle;
  o.description = '<p>' + job.intro + '</p><p><b>' + job.taskLabel + '</b><br>' + job.tasks + '</p><p><br><b>' + job.profileLabel + '</b><br>' + job.profile + '</p><p><br><b>' + job.offerLabel + '</b><br>' + job.offer + '</p><p><b>' + job.contactInfoLabel + '</b><br>' + job.contactInfo + '</p>';
  o.identifier.name = 'yawik';
  o.identifier.value = job.org?.id;
  o.datePosted = today.toISOString().slice(0, 10);
  o.validThrough = expires.toISOString().slice(0, 10);
  o.hiringOrganization.name = job.org?.name;
  o.hiringOrganization.sameAs = job.org?.name;
  o.hiringOrganization.logo = 'https://api.yawik.org' + job.logo?.url;
  o.jobLocation.address.addressLocality = job.location.addressLocality;
  o.jobLocation.address.streetAddress = job.location.streetAddress;
  o.jobLocation.address.addressRegion = job.location.addressRegion;
  o.jobLocation.address.addressCountry = job.location.addressCountry;
  o.baseSalary.currency = 'EUR';
  o.baseSalary.value.minValue = job.meta.salary.value.split('|').map(item => item + '000')[0];
  o.baseSalary.value.maxValue = job.meta.salary.value.split('|').map(item => item + '000')[1];
  o.baseSalary.value.unitText = 'YEAR';
  o.jobLocationType = job.meta.remoteWorkPercentage > 10 ? 'TELECOMMUTE' : '';

  const employment = job.meta.workKind.map(item => ({
    freelance: 'OTHER',
    contract: 'CONTRACTOR',
  }[item])).concat(job.meta.workDuration.map(item => ({
    fulltime: 'FULL_TIME',
    parttime: 'PART_TIME',
  }[item])));
  if (employment > 0) o.employmentType = employment;
  if (job.applyURL) o.directApply = true;
  return JSON.stringify(o);
}

export default createJsonLd;
