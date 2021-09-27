
data = open('ASNDATA.csv','r')
output = open('asn-count.csv', 'w')

asn_per_country = {}

for line in data:
    country = line.split(',')[2].replace('"', '').strip()

    if country in asn_per_country:
        asn_per_country[country] += 1
    else:
        asn_per_country[country] = 1

asn_per_country.pop('country')
sorted_asn = sorted(asn_per_country.items())


output.write("Country,ASN Count\n")
for country in sorted_asn:
    output.write(str(country[0]) + "," + str(country[1]) + '\n')


data.close
output.close