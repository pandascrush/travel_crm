import React, { useEffect, useState } from 'react'
import { BACKEND_DOMAIN } from '../../../common/api/ApiClient';
import { GetSpecificAppConfig, SingleFileUpload, UpdateAppConfig, UpdateAppConfigSocialLinks } from '../../../common/api/ApiService';
import { errorMsg, successMsg } from '../../../common/Toastify';
import { normalizeEmptyFields } from '../../../common/Validation';

const GlobalSettings = () => {
    const [appConfigData, setApppConfigData] = useState({})
    const getAppConfig = async () => {
        const response = await GetSpecificAppConfig()
        if (response && response?.statusCode === 200) {
            setApppConfigData(response?.data)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split(".");

        setApppConfigData((prev) => {
            const updated = { ...prev };
            let temp = updated;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!temp[keys[i]]) temp[keys[i]] = {};
                temp = temp[keys[i]];
            }

            temp[keys[keys.length - 1]] = value;

            return updated;
        });
    };


    const handleFileUpload = async (e, key) => {
        const file = e.target.files[0];

        if (!file) return;
        let image_name = e?.target?.files[0]?.name;
        let image_type = image_name?.split(".");
        let type = image_type?.pop();
        if (type !== "jpeg" && type !== "png" && type !== "jpg" && type !== "pdf" && type !== "webp") {
            errorMsg("Unsupported file type")
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("storage", "local");
        const response = await SingleFileUpload(formData);

        if (response?.statusCode !== 200) {
            errorMsg("Failed to upload file")
            return;
        }

        const path = response?.path;
        successMsg("File upload successfully")

        setApppConfigData({ ...appConfigData, [key]: path })
    };

    const handleUpdate = async (e) => {
        const { __v, createdAt, updatedAt, ...removedObject } = appConfigData;
        e.preventDefault()
        const cleanedData = normalizeEmptyFields(removedObject);
        // if (Object.values(isValide).every((data) => data?.status === true)) {
        const response = await UpdateAppConfig(cleanedData)
        if (response && response?.statusCode === 200) {
            successMsg("App Configuration Updated Successsfully")
            getAppConfig()
        }
        // }

    }


    const handleToggleShow = async (platform) => {
        const url = appConfigData?.social_links?.[platform]?.url;
        const currentShow = appConfigData?.social_links?.[platform]?.show;

        const payload = {
            social_links: {
                [platform]: {
                    url,
                    show: !currentShow,
                }
            }
        };

        const response = await UpdateAppConfigSocialLinks(payload);
        if (response?.statusCode === 200) {
            successMsg("Visibility toggled successfully");
            getAppConfig();
        } else {
            errorMsg("Failed to toggle visibility");
        }
    };

    useEffect(() => {
        getAppConfig()
    }, [])


    console.log(appConfigData, "appConfigData")
    return (
        <div className='admin-content-main min-vh-100'>

            <div className='global-tabs-parent'>
                <div className='global-tabs-main'>
                    <button className='active'>
                        Global Settings
                    </button>
                </div>
            </div>

            <div className='mt-5 mb-5'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='model-input-div mt-4'>
                            <label>Company Name</label>
                            <input type="text" value={appConfigData?.company_name || ""}
                                name='company_name'
                                placeholder="Enter Compnay Name"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div'>
                            <label>Phone Number 1 </label>
                            <input type="text" value={appConfigData?.phone1 || ""}
                                name='phone1'
                                placeholder="Enter Phone Number"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div'>
                            <label>Phone Number 2 </label>
                            <input type="text" value={appConfigData?.phone2 || ""}
                                name='phone2'
                                placeholder="Enter Phone Number"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div mt-4'>
                            <label>Email Addres</label>
                            <input type="text" value={appConfigData?.email || ""}
                                name='email'
                                placeholder="Enter Email Address"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div mt-4'>
                            <label>Company Address</label>
                            <textarea type="text" value={appConfigData?.address || ""}
                                name='address'
                                placeholder="Enter Company Address"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>

                    <div className='col-lg-6'>
                        <div className='model-input-div'>
                            <label>Logo Image</label>
                            <input
                                type="file"
                                name='activity_image'
                                accept='.png,.jpeg,.jpg,.pdf,.webp'
                                className="form-control"
                                onChange={(e) => { handleFileUpload(e, "logo_url"); handleChange(e) }}
                            />
                            {appConfigData?.logo_url && (
                                <div className='upload-image-div logo-global-settings'>
                                    <img src={`${BACKEND_DOMAIN}${appConfigData?.logo_url}`} alt="Category-Preview" />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <p className='header-title'>Social Media Links</p>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='model-input-div'>
                            <label>Facebook Link</label>
                            <div className='d-flex app-config mt-2'>
                                <i className="fa-brands fa-facebook-f"></i>
                                <input type="text"
                                    value={appConfigData?.social_links?.facebook?.url || ""}
                                    name="social_links.facebook.url"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }} />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label className='show-website fw-bold'>Show In Website</label>
                            <div className="switch" onClick={() => handleToggleShow('facebook')}>
                                <input type="checkbox"
                                    checked={appConfigData?.social_links?.facebook?.show}
                                />
                                <span className="slider-table round"></span>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div'>
                            <label>Instagram Link</label>
                            <div className='d-flex app-config mt-2'>
                                <i className="fa-brands fa-instagram"></i>
                                <input type="text" value={appConfigData?.social_links?.instagram?.url || ""}
                                    name="social_links.instagram.url"
                                    placeholder="Enter Instgaram Link"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label className='show-website fw-bold'>Show In Website</label>
                            <div className="switch" onClick={() => handleToggleShow('instagram')}>
                                <input type="checkbox" checked={appConfigData?.social_links?.instagram?.show} />
                                <span className="slider-table round"></span>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div mt-5'>
                            <label>Linkedin Link</label>
                            <div className='d-flex app-config mt-2'>
                                <i className="fa-brands fa-linkedin-in"></i>
                                <input type="text" value={appConfigData?.social_links?.linkedin?.url || ""}
                                    name="social_links.linkedin.url"
                                    placeholder="Enter Linkedin Link"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label className='show-website fw-bold'>Show In Website</label>
                            <div className="switch" onClick={() => handleToggleShow('linkedin')}>
                                <input type="checkbox" checked={appConfigData?.social_links?.linkedin?.show} />
                                <span className="slider-table round"></span>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div mt-5'>
                            <label>You Tube Link</label>
                            <div className='d-flex app-config mt-2'>
                                <i class="fa-brands fa-youtube"></i>
                                <input type="text" value={appConfigData?.social_links?.youtube?.url || ""}
                                    placeholder="Enter You Tube Link"
                                    name="social_links.youtube.url"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='mt-4'>
                                <label className='show-website fw-bold'>Show In Website</label>
                                <div className="switch" onClick={() => handleToggleShow('youtube')}>
                                    <input type="checkbox" checked={appConfigData?.social_links?.youtube?.show} />
                                    <span className="slider-table round"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div mt-5'>
                            <label>X Link</label>
                            <div className='d-flex app-config mt-2'>
                                <i className="fa-brands fa-x-twitter"></i>
                                <input type="text" value={appConfigData?.social_links?.twitter?.url || ""}
                                    placeholder="Enter X Link"
                                    name="social_links.twitter.url"
                                    onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label className='show-website fw-bold'>Show In Website</label>
                            <div className="switch" onClick={() => handleToggleShow('twitter')}>
                                <input type="checkbox" checked={appConfigData?.social_links?.twitter?.show} />
                                <span className="slider-table round"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <p className='header-title mt-5'>Scripts</p>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='model-input-div'>
                            <label>Google Analytics </label>
                            <textarea type="text" value={appConfigData?.google_analytics || ""}
                                name='google_analytics'
                                placeholder="Enter Google Analytics here"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div mt-4'>
                            <label>Google Search Console</label>
                            <textarea type="text" value={appConfigData?.google_search_console || ""}
                                name='google_search_console'
                                placeholder="Enter Google Search Console script here"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='model-input-div mt-4'>
                            <label>Meta Pixel script</label>
                            <textarea type="text" value={appConfigData?.meta_pixel || ""}
                                name='meta_pixel'
                                placeholder="Enter Meta Pixel script here"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <button className='create-common-btn' type='submit' onClick={(e) => handleUpdate(e)}>Update App Configuration</button>

        </div>
    )
}

export default GlobalSettings
