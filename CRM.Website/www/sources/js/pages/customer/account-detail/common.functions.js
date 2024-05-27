import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';

export const ValidateHeadlineStaffAndAuthority = (values, indexStaff) => {
    const errors = {};
    let headlineStaffsAndAuthority = values;

    if (!headlineStaffsAndAuthority[indexStaff].picName || headlineStaffsAndAuthority[indexStaff].picName.trim().length === 0) {
        errors.picName = LangHelper.getResource('NameRequired');
        headlineStaffsAndAuthority[indexStaff].isErrorPicName = true;
    } else {
        headlineStaffsAndAuthority[indexStaff].isErrorPicName = false;
    }

    if (!headlineStaffsAndAuthority[indexStaff].picRoleID) {
        errors.role = LangHelper.getResource('RoleRequired');
        headlineStaffsAndAuthority[indexStaff].isErrorPicRoleID = true;
    } else {
        headlineStaffsAndAuthority[indexStaff].isErrorPicRoleID = false;
    }

    headlineStaffsAndAuthority[indexStaff].communicationTools.map((staffCom, indexStaffCom) => {
        if (!staffCom.picCommunicationID || !staffCom.picCommunicationValue) {
            errors.communication = LangHelper.getResource('CommunicationRequired');
            headlineStaffsAndAuthority[indexStaff].communicationTools[indexStaffCom].isErrorPicCommunication = true;
        } else {
            headlineStaffsAndAuthority[indexStaff].communicationTools[indexStaffCom].isErrorPicCommunication = false;
        }

        if (!staffCom.picCommunicationID || !staffCom.picCommunicationValue) {
            errors.communication = LangHelper.getResource('CommunicationRequired');
            headlineStaffsAndAuthority[indexStaff].communicationTools[indexStaffCom].isErrorPicCommunication = true;
        } else {
            headlineStaffsAndAuthority[indexStaff].communicationTools[indexStaffCom].isErrorPicCommunication = false;
        }

        if (!staffCom.authorityID && !headlineStaffsAndAuthority[indexStaff].isSyncFromPicTable) {
            errors.authority = LangHelper.getResource('AuthorityRequired');
            headlineStaffsAndAuthority[indexStaff].communicationTools[indexStaffCom].isErrorPicAuthorityID = true;
        } else {
            headlineStaffsAndAuthority[indexStaff].communicationTools[indexStaffCom].isErrorPicAuthorityID = false;
        }
    });
    return { errors: errors , headlineStaffsAndAuthority: headlineStaffsAndAuthority };
};

export const GetLengthCommunicationValue = (compic, indexCompic, communicationTools) => {
    let value = compic.value;
    communicationTools.map((item, index) => {
        if (index !== indexCompic && compic.type === item.type) {
            value += `,${item.value}`;
        }
    })
    return value.length;
};

export const ValidateHeadlineCommunicationInfo = (values) => {
    const errors = {};
    let headlineCommunicationInfo = values;

    headlineCommunicationInfo.map((pic, indexPic) => {
        if (!pic.picName || pic.picName.trim().length === 0) {
            errors.picName = LangHelper.getResource('NameRequired');
            headlineCommunicationInfo[indexPic].isNameError = true;
        } else {
            headlineCommunicationInfo[indexPic].isNameError = false;
        }

        if (!pic.role) {
            errors.role = LangHelper.getResource('RoleRequired');
            headlineCommunicationInfo[indexPic].isRoleError = true;
        } else {
            headlineCommunicationInfo[indexPic].isRoleError = false;
        }

        pic.picCommunicationTools.map((compic, indexCompic) => {
            if (!compic.type || !compic.value) {
                errors.communication = LangHelper.getResource('CommunicationRequired');
                headlineCommunicationInfo[indexPic].picCommunicationTools[indexCompic].isError = true;
            } else {
                headlineCommunicationInfo[indexPic].picCommunicationTools[indexCompic].isError = false;
            }

            const lengthValue = GetLengthCommunicationValue(compic, indexCompic, pic.picCommunicationTools);
            if (compic.type && compic.value && lengthValue > 200) {
                errors.maxLengthCommunicationValue = LangHelper.getResource('CommunicationExceedMaxLength');
                headlineCommunicationInfo[indexPic].picCommunicationTools[indexCompic].isError = true;
            }
        });
    });
    return { errors: errors, headlineCommunicationInfo: headlineCommunicationInfo };
};

export const ValidateNormalCommunicationInfo = (values) => {
    let errors = {};
    let otherAccountCommunication = values;

    values.map((pic, indexPic) => {
        if (!pic.communicationID || !pic.communicationValue) {
            errors.communication = LangHelper.getResource('CommunicationRequired');
            otherAccountCommunication[indexPic].isError = true;
        } else {
            otherAccountCommunication[indexPic].isError = false;
        }

        const lengthValue = GetLengthNormalCommunicationValue(pic, indexPic, otherAccountCommunication);
        if (pic.communicationID && pic.communicationValue && lengthValue > 200) {
            errors.maxLengthCommunicationValue = LangHelper.getResource('CommunicationExceedMaxLength');
            otherAccountCommunication[indexPic].isError = true;
        }

    });

    return { errors: errors, otherAccountCommunication: otherAccountCommunication };
}

export const GetLengthNormalCommunicationValue = (compic, indexCompic, communicationTools) => {
    let value = compic.communicationValue;
    communicationTools.map((item, index) => {
        if (index !== indexCompic && compic.communicationID === item.communicationID) {
            value += `,${item.communicationValue}`;
        }
    })
    return value.length;
}

export const ValidateCompanyService = values => {
    const errors = {};
    const companyService = values;

    companyService.map((service, index) => {
        if (service.isOffered && (service.communicationID === 0 || service.communicationValue === null || service.communicationValue === '')) {
            errors.communication = LangHelper.getResource('CommunicationRequired');
            companyService[index].isError = true;
        } else {
            companyService[index].isError = false;
        }
    });
    return { errors: errors, companyService: companyService };
};

export const ParamsCustomerInfo = customerInfo => {
    return {
        titleId: customerInfo.titleId,
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        birthDay: customerInfo.birthday ? new Date(customerInfo.birthday) : '',
        passport: customerInfo.passport,
        refCode2: customerInfo.refCode2,
        languages: customerInfo.languages,
        siteId: customerInfo.siteId,
        refCode1: customerInfo.refCode1,
        licenseeTypeId: customerInfo.licenseeType,
        isVip: customerInfo.isVIP,
        isIgnored: customerInfo.ignored,
        phoneCountryCode: customerInfo.phoneCountryCode,
        phoneAreaCode: customerInfo.phoneAreaCode,
        phone: customerInfo.phone,
        phone2CountryCode: customerInfo.phone2CountryCode,
        phone2AreaCode: customerInfo.phone2AreaCode,
        phone2: customerInfo.phone2,
        phone3CountryCode: customerInfo.phone3CountryCode,
        phone3AreaCode: customerInfo.phone3AreaCode,
        phone3: customerInfo.phone3,
        checker: customerInfo.checker,
        introducedBy: customerInfo.introducedBy,
        faxCountryCode: customerInfo.faxCountryCode,
        faxAreaCode: customerInfo.faxAreaCode,
        faxNumber: customerInfo.fax,
        mobileCountryCode: customerInfo.mobilePhoneCountryCode,
        mobileAreaCode: customerInfo.mobilePhoneAreaCode,
        mobilePhoneNumber: customerInfo.mobilePhone,
        pic1Name: customerInfo.pic1Name,
        pic1PhoneNumber: customerInfo.pic1,
        pic2Name: customerInfo.pic2Name,
        pic2PhoneNumber: customerInfo.pic2,
        pic3Name: customerInfo.pic3Name,
        pic3PhoneNumber: customerInfo.pic3,
        pic4Name: customerInfo.pic4Name,
        pic4PhoneNumber: customerInfo.pic4,
        skype: customerInfo.skype,
        email: customerInfo.email,
        telegram: customerInfo.msn,
        weChat: customerInfo.weChat,
        whatsApp: customerInfo.whatsApp,
        line: customerInfo.line,
        letstalk: customerInfo.yahoo,
        qq: customerInfo.qq,
        zalo: customerInfo.bbm,
        homeAddressLine1: customerInfo.line1,
        homeAddressLine2: customerInfo.line2,
        homeAddressLine3: customerInfo.line3,
        homeAddressCity: customerInfo.city,
        homeAddressCountryId: customerInfo.countryId,
        homeAddressState: customerInfo.state,
        homeAddressPostCode: customerInfo.postCode,
        bankInfoHolderName: customerInfo.bankHolderName,
        bankInfoName: customerInfo.bankName,
        bankInfoAccNo: customerInfo.bankAccountNumber,
        bankInfoSwiftCode: customerInfo.bankSwiftCode,
        bankAddressLine1: customerInfo.bankAddressLine1,
        bankAddressLine2: customerInfo.bankAddressLine2,
        bankAddressLine3: customerInfo.bankAddressLine3,
        bankAddressCity: customerInfo.bankAddressCity,
        bankAddressCountryId: customerInfo.bankAddressCountryId,
        bankAddressState: customerInfo.bankAddressState,
        bankAddressPostCode: customerInfo.bankAddressPostCode
    };
};

export const ParamsSubmit = (custId, values) => {
    return {
        customerId: custId,
        firstName: values.firstName,
        lastName: values.lastName,
        titleId: values.titleId,
        birthDay: values.birthDay ? DateTimeService.toShortDateFormat(values.birthDay) : null,
        languageId: values.languages.toString(),
        phone: values.phone,
        phoneCountryCode: values.phoneCountryCode,
        phoneAreaCode: values.phoneAreaCode,
        phone2: values.phone2,
        phone2CountryCode: values.phone2CountryCode,
        phone2AreaCode: values.phone2AreaCode,
        phone3: values.phone3,
        phone3CountryCode: values.phone3CountryCode,
        phone3AreaCode: values.phone3AreaCode,
        passport: values.passport,
        mobilePhone: values.mobilePhoneNumber,
        mobilePhoneCountryCode: values.mobileCountryCode,
        mobilePhoneAreaCode: values.mobileAreaCode,
        fax: values.faxNumber,
        faxCountryCode: values.faxCountryCode,
        faxAreaCode: values.faxAreaCode,
        email: values.email,
        skype: values.skype,
        msn: values.telegram,
        pic1: values.pic1PhoneNumber,
        pic2: values.pic2PhoneNumber,
        pic3: values.pic3PhoneNumber,
        pic4: values.pic4PhoneNumber,
        pic1Name: values.pic1Name,
        pic2Name: values.pic2Name,
        pic3Name: values.pic3Name,
        pic4Name: values.pic4Name,
        siteId: values.siteId,
        bettingCode: values.refCode1,
        refCode2: values.refCode2,
        line1: values.homeAddressLine1,
        line2: values.homeAddressLine2,
        line3: values.homeAddressLine3,
        city: values.homeAddressCity,
        countryId: values.homeAddressCountryId,
        postCode: values.homeAddressPostCode,
        state: values.homeAddressState,
        isVip: values.isVip,
        ignored: values.isIgnored,
        introducedBy: values.introducedBy,
        bankHolderName: values.bankInfoHolderName,
        bankName: values.bankInfoName,
        bankAccountNumber: values.bankInfoAccNo,
        bankSwiftCode: values.bankInfoSwiftCode,
        bankLine1: values.bankAddressLine1,
        bankLine2: values.bankAddressLine2,
        bankLine3: values.bankAddressLine3,
        bankCity: values.bankAddressCity,
        bankCode: values.bankAddressPostCode,
        bankState: values.bankAddressState,
        bankCountryId: values.bankAddressCountryId,
        licenseeType: values.licenseeTypeId,
        whatsApp: values.whatsApp,
        line: values.line,
        weChat: values.weChat,
        yahoo: values.letstalk,
        qq: values.qq,
        bbm: values.zalo
    };
};

export const getHeadlineCommunicationInfo = customerInfo => {
    let headlineCommunicationInfo = [];
    customerInfo.headlineStaffInfoPics.map(pic => {
        let languages = [];
        let communicationTools = [];
        customerInfo.headlineStaffInfoLanguages.map(language => {
            if (language.picID === pic.picID) {
                languages.push(language.picLanguageID);
            }
        });
        customerInfo.headlineStaffInfoCommunications.map(communication => {
            if (communication.picID === pic.picID) {
                communicationTools.push({
                    type: communication.picCommunicationId,
                    value: communication.picCommunicationValue,
                    isError: false,
                    isNew: false
                });
            }
        });
        headlineCommunicationInfo.push({
            country: pic.picCountryID,
            language: languages.join(","),
            picCommunicationTools: communicationTools,
            picId: pic.picID,
            picName: pic.picName,
            picType: pic.picTypeID,
            role: pic.picRoleID,
            roleName: pic.picRoleName,
            isNameError: false,
            isRoleError: false
        });
    });
    return headlineCommunicationInfo;
} 